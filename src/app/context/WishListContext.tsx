"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Shoe {
  id: string;
  type: string;
  brand: string;
  model: string;
  size: string;
  price: number;
  imageUrl?: string;
  createdAt: string;
  revoked?: boolean;
}

interface WishlistContextType {
  wishlistItems: Shoe[];
  addToWishlist: (shoe: Shoe) => void;
  removeFromWishlist: (shoeId: string) => void;
  isInWishlist: (shoeId: string) => boolean;
  getTotalWishlistItems: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Shoe[]>([]);

  // Load wishlist from memory on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("wishlist");
    if (stored) {
      try {
        setWishlistItems(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse wishlist:", e);
      }
    }
  }, []);

  // Save to sessionStorage whenever wishlist changes
  useEffect(() => {
    sessionStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (shoe: Shoe) => {
    setWishlistItems((prev) => {
      // Check if already in wishlist
      if (prev.some((item) => item.id === shoe.id)) {
        return prev;
      }
      return [...prev, shoe];
    });
  };

  const removeFromWishlist = (shoeId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== shoeId));
  };

  const isInWishlist = (shoeId: string) => {
    return wishlistItems.some((item) => item.id === shoeId);
  };

  const getTotalWishlistItems = () => {
    return wishlistItems.length;
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getTotalWishlistItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}