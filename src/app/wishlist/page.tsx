"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowLeft, Plus, Minus, X } from "lucide-react";
import { useWishlist } from "~/app/context/WishListContext";
import { useCart } from "~/app/context/CartContext";

interface OrderItem {
  size: string;
  quantity: number;
}

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const availableSizes = ["6", "7", "8", "9", "10", "11", "12", "13"];

  const handleAddToCart = (shoe: any) => {
    setSelectedShoe(shoe);
    setOrderItems([]);
    setShowModal(true);
  };

  const handleSizeQuantityChange = (size: string, change: number) => {
    setOrderItems((prev) => {
      const existing = prev.find((item) => item.size === size);
      if (existing) {
        const newQuantity = existing.quantity + change;
        if (newQuantity <= 0) {
          return prev.filter((item) => item.size !== size);
        }
        return prev.map((item) =>
          item.size === size ? { ...item, quantity: newQuantity } : item
        );
      } else if (change > 0) {
        return [...prev, { size, quantity: 1 }];
      }
      return prev;
    });
  };

  const calculateModalTotal = () => {
    if (!selectedShoe) return 0;
    const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
    return selectedShoe.price * totalQuantity;
  };

  const handleConfirmAddToCart = () => {
    if (!selectedShoe || orderItems.length === 0) return;

    addToCart(selectedShoe, orderItems);

    alert(
      `Added to cart!\n${orderItems.map((item) => `Size ${item.size} x${item.quantity}`).join("\n")}\nTotal: ₱${calculateModalTotal().toLocaleString()}`
    );

    setShowModal(false);
    setOrderItems([]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#000000] via-[#1a1a1a] to-[#2d2d2d] text-white pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Products</span>
          </Link>

          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
              Wishlist
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            {wishlistItems.length > 0
              ? `You have ${wishlistItems.length} item${wishlistItems.length !== 1 ? "s" : ""} in your wishlist`
              : "Your wishlist is empty"}
          </p>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((shoe) => (
              <div
                key={shoe.id}
                className="group bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="bg-gradient-to-br from-white to-gray-200 h-64 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500 relative">
                  {shoe.imageUrl ? (
                    <img
                      src={shoe.imageUrl}
                      alt={`${shoe.brand} ${shoe.model}`}
                      className="w-full h-full object-contain p-6"
                    />
                  ) : (
                    "👟"
                  )}
                  <button
                    onClick={() => removeFromWishlist(shoe.id)}
                    className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors shadow-lg"
                  >
                    <Trash2 size={20} className="text-white" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400 uppercase tracking-wide">
                      {shoe.type}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {shoe.brand} {shoe.model}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    Size {shoe.size} — crafted for style and performance.
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-white">
                      ₱{shoe.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(shoe)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(shoe.id)}
                      className="px-4 py-3 bg-red-500/20 text-red-400 border border-red-500/30 font-semibold rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">💔</div>
            <h2 className="text-3xl font-bold text-white mb-4">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Start adding items to your wishlist by clicking the heart icon on products
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>

      {/* Add to Cart Modal */}
      {showModal && selectedShoe && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-gradient-to-b from-[#1a1a1a] to-[#1a1a1a]/95">
              <h2 className="text-2xl font-bold text-white">Add to Cart</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex gap-6 mb-6">
                <div className="bg-gradient-to-br from-white to-gray-200 rounded-xl w-32 h-32 flex items-center justify-center flex-shrink-0">
                  {selectedShoe.imageUrl ? (
                    <img
                      src={selectedShoe.imageUrl}
                      alt={selectedShoe.model}
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <div className="text-6xl">👟</div>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedShoe.brand} {selectedShoe.model}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">{selectedShoe.type}</p>
                  <p className="text-2xl font-bold text-white">
                    ₱{selectedShoe.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Select Sizes & Quantity</h3>
                <div className="grid grid-cols-2 gap-4">
                  {availableSizes.map((size) => {
                    const item = orderItems.find((i) => i.size === size);
                    const quantity = item?.quantity || 0;
                    return (
                      <div
                        key={size}
                        className="bg-white/5 border border-white/10 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Size {size}</span>
                          <span className="text-gray-400 text-sm">
                            ₱{selectedShoe.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleSizeQuantityChange(size, -1)}
                            disabled={quantity === 0}
                            className={`p-2 rounded-lg transition-colors ${
                              quantity === 0
                                ? "bg-white/5 text-gray-600 cursor-not-allowed"
                                : "bg-white/10 text-white hover:bg-white/20"
                            }`}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-white font-bold w-8 text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => handleSizeQuantityChange(size, 1)}
                            className="p-2 bg-white/10 text-white hover:bg-white/20 rounded-lg transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {orderItems.length > 0 && (
                <div className="bg-white/10 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
                  {orderItems.map((item) => (
                    <div key={item.size} className="flex justify-between text-gray-300 mb-2">
                      <span>
                        Size {item.size} × {item.quantity}
                      </span>
                      <span>
                        ₱{(selectedShoe.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-white/20 mt-4 pt-4 flex justify-between items-center">
                    <span className="text-2xl font-bold text-white">Total</span>
                    <span className="text-3xl font-bold text-white">
                      ₱{calculateModalTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={handleConfirmAddToCart}
                disabled={orderItems.length === 0}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                  orderItems.length === 0
                    ? "bg-white/10 text-gray-500 cursor-not-allowed"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}