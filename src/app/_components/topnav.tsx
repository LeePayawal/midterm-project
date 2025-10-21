"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ShoppingCart, Heart, Package } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useCart } from "~/app/context/CartContext";
import { useWishlist } from "~/app/context/WishListContext";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/dashboard" },
  { name: "Features", href: "/features" },
  { name: "Contact", href: "/contact" },
];

export function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { getTotalItems } = useCart();
  const { getTotalWishlistItems } = useWishlist();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black to-gray-400 backdrop-blur-sm border-b border-gray-500/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600 bg-clip-text text-transparent drop-shadow-sm">
                REALE$T
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation (Signed In only) */}
          <SignedIn>
            <div className="hidden md:flex items-center space-x-8 text-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-gray-100 ${
                    isActive(item.href)
                      ? "text-white border-b-2 border-gray-300"
                      : "text-gray-300"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </SignedIn>

          {/* Auth Buttons + Wishlist + Cart + Orders + Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Wishlist Icon */}
            <SignedIn>
              <Link
                href="/wishlist"
                className="relative p-2 text-gray-300 hover:text-white transition-colors"
              >
                <Heart size={24} />
                {getTotalWishlistItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
                    {getTotalWishlistItems()}
                  </span>
                )}
              </Link>
            </SignedIn>

            {/* Cart Icon */}
            <SignedIn>
              <Link
                href="/cart"
                className="relative p-2 text-gray-300 hover:text-white transition-colors"
              >
                <ShoppingCart size={24} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-gray-400 to-gray-200 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </SignedIn>

            {/* Orders Icon */}
            <SignedIn>
              <Link
                href="/orders"
                className="relative p-2 text-gray-300 hover:text-white transition-colors"
              >
                <Package size={24} />
              </Link>
            </SignedIn>

            <SignedOut>
              <div className="cursor-pointer group">
                <div className="px-5 py-2 bg-gradient-to-r from-black to-gray-500 hover:from-gray-800 hover:to-gray-400 rounded-full text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-gray-400/30 hover:scale-105">
                  <SignInButton />
                </div>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="p-1 bg-gradient-to-r from-gray-600 to-gray-300 rounded-full shadow">
                <UserButton />
              </div>
            </SignedIn>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <SignedIn>
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-r from-black to-gray-500 border-t border-gray-500/50">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                      isActive(item.href)
                        ? "text-white bg-gray-800"
                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Wishlist link in mobile menu */}
                <Link
                  href="/wishlist"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    pathname === "/wishlist"
                      ? "text-white bg-gray-800"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Heart size={20} />
                    Wishlist
                  </span>
                  {getTotalWishlistItems() > 0 && (
                    <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
                      {getTotalWishlistItems()}
                    </span>
                  )}
                </Link>

                {/* Cart link in mobile menu */}
                <Link
                  href="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    pathname === "/cart"
                      ? "text-white bg-gray-800"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ShoppingCart size={20} />
                    Cart
                  </span>
                  {getTotalItems() > 0 && (
                    <span className="bg-gradient-to-r from-gray-400 to-gray-200 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>

                {/* Orders link in mobile menu */}
                <Link
                  href="/orders"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    pathname === "/orders"
                      ? "text-white bg-gray-800"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Package size={20} />
                    Orders
                  </span>
                </Link>
              </div>
            </div>
          </SignedIn>
        )}
      </div>
    </nav>
  );
}