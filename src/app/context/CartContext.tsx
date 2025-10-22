"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface Shoe {
  id: string;
  brand: string;
  model: string;
  type: string;
  price: number;
  imageUrl?: string;
}

interface CartItem {
  id: string;
  shoe: Shoe;
  size: string;
  quantity: number;
}

interface OrderItem {
  size: string;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: string;
  shippingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postal: string;
  };
  paymentMethod: string;
  trackingNumber: string;
}

interface CartContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (shoe: Shoe, orderItems: OrderItem[]) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, change: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getTotalItems: () => number;
  completeOrder: (shippingInfo: any, paymentMethod: string) => Promise<void>;
  cancelOrder: (orderId: string) => void;
  isHydrated: boolean;
  loadOrders: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage after component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('shoeCart');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    // Load orders from database
    loadOrders();
    
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('shoeCart', JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  const loadOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const dbOrders = await res.json();
        
        // Transform database orders to match our format
        const formattedOrders = dbOrders.map((order: any) => ({
          id: order.id,
          date: order.orderDate,
          items: order.items,
          total: order.total,
          status: order.status,
          shippingInfo: order.shippingInfo,
          paymentMethod: order.paymentMethod,
          trackingNumber: order.trackingNumber,
        }));
        
        setOrders(formattedOrders);
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
      // Fallback to localStorage if database fails
      const savedOrders = localStorage.getItem('shoeOrders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    }
  };

  const addToCart = (shoe: Shoe, orderItems: OrderItem[]) => {
    const newCartItems: CartItem[] = [];
    
    orderItems.forEach(orderItem => {
      const existingItem = cart.find(
        (item) => item.shoe.id === shoe.id && item.size === orderItem.size
      );

      if (existingItem) {
        setCart(prevCart =>
          prevCart.map((item) =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + orderItem.quantity }
              : item
          )
        );
      } else {
        const newItem: CartItem = {
          id: `${shoe.id}-${orderItem.size}-${Date.now()}-${Math.random()}`,
          shoe,
          size: orderItem.size,
          quantity: orderItem.quantity,
        };
        newCartItems.push(newItem);
      }
    });

    if (newCartItems.length > 0) {
      setCart(prevCart => [...prevCart, ...newCartItems]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, change: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.shoe.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const completeOrder = async (shippingInfo: any, paymentMethod: string) => {
    const orderId = `ORD-${Date.now().toString().slice(-8)}`;
    const trackingNumber = `TRK${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    
    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString(),
      items: [...cart],
      total: getCartTotal(),
      status: "Processing",
      shippingInfo,
      paymentMethod,
      trackingNumber,
    };

    try {
      // Save to database
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });

      if (res.ok) {
        console.log("Order saved to database successfully");
      } else {
        console.error("Failed to save order to database");
        // Fallback: save to localStorage
        localStorage.setItem('shoeOrders', JSON.stringify([newOrder, ...orders]));
      }
    } catch (error) {
      console.error("Error saving order:", error);
      // Fallback: save to localStorage
      localStorage.setItem('shoeOrders', JSON.stringify([newOrder, ...orders]));
    }

    setOrders([newOrder, ...orders]);
    clearCart();
  };

  const cancelOrder = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        getTotalItems,
        completeOrder,
        cancelOrder,
        isHydrated,
        loadOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};