"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, X, Plus, Minus, Ruler, Heart } from "lucide-react";
import { useCart } from "~/app/context/CartContext";
import { useWishlist } from "~/app/context/WishListContext";

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

interface OrderItem {
  size: string;
  quantity: number;
}

export default function DashboardPage() {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [message, setMessage] = useState("Loading shoes…");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart, getTotalItems } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, getTotalWishlistItems } = useWishlist();
  const shoesPerPage = 6;

  useEffect(() => {
    async function fetchShoes() {
      try {
        const res = await fetch("/api/proxy", { cache: "no-store" });
        const data: Shoe[] | { error: string } = await res.json();

        if (!res.ok || "error" in data) {
          setMessage("❌ " + ("error" in data ? data.error : "Fetch failed"));
          return;
        }

        setShoes(data);
        setMessage(`✅ Loaded ${data.length} shoes`);
      } catch (err) {
        setMessage("❌ Error fetching data");
      }
    }

    fetchShoes();
    const interval = setInterval(fetchShoes, 10000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: "Running Shoes", emoji: "👟", filterTerm: "running" },
    { name: "Dress Shoes", emoji: "👞", filterTerm: "dress" },
    { name: "Sneakers", emoji: "👟", filterTerm: "sneaker" },
    { name: "Boots", emoji: "🥾", filterTerm: "boot" }
  ];

  const availableSizes = ["6", "7", "8", "9", "10", "11", "12", "13"];

  const sizeChart = [
    { us: "6", uk: "5.5", eu: "39" },
    { us: "7", uk: "6.5", eu: "40" },
    { us: "8", uk: "7.5", eu: "41" },
    { us: "9", uk: "8.5", eu: "42" },
    { us: "10", uk: "9.5", eu: "44" },
    { us: "11", uk: "10.5", eu: "45" },
    { us: "12", uk: "11.5", eu: "46" },
    { us: "13", uk: "12.5", eu: "47" },
  ];

  const filteredShoes = selectedCategory
    ? shoes.filter(shoe => {
        const category = categories.find(cat => cat.name === selectedCategory);
        if (!category) return false;
        return shoe.type.toLowerCase().includes(category.filterTerm);
      })
    : shoes;

  const searchFilteredShoes = filteredShoes.filter(shoe => {
    if (searchQuery === "") return true;
    
    return shoe.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shoe.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shoe.type.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(searchFilteredShoes.length / shoesPerPage);
  const indexOfLastShoe = currentPage * shoesPerPage;
  const indexOfFirstShoe = indexOfLastShoe - shoesPerPage;
  const currentShoes = searchFilteredShoes.slice(indexOfFirstShoe, indexOfLastShoe);

  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryName);
    }
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (shoe: Shoe) => {
    setSelectedShoe(shoe);
    setOrderItems([]);
    setShowModal(true);
  };

  const handleWishlistToggle = (shoe: Shoe) => {
    if (isInWishlist(shoe.id)) {
      removeFromWishlist(shoe.id);
    } else {
      addToWishlist(shoe);
    }
  };

  const handleSizeQuantityChange = (size: string, change: number) => {
    setOrderItems(prev => {
      const existing = prev.find(item => item.size === size);
      if (existing) {
        const newQuantity = existing.quantity + change;
        if (newQuantity <= 0) {
          return prev.filter(item => item.size !== size);
        }
        return prev.map(item =>
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
    
    alert(`Added to cart!\n${orderItems.map(item => `Size ${item.size} x${item.quantity}`).join('\n')}\nTotal: ₱${calculateModalTotal().toLocaleString()}`);
    
    setShowModal(false);
    setOrderItems([]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#000000] via-[#1a1a1a] to-[#2d2d2d] text-white">
      {/* Navigation Bar */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👟</span>
            <span className="text-xl font-bold text-white">Premium Shoes</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-white hover:text-gray-300 transition-colors font-bold">
              Home
            </Link>
            <Link href="/orders" className="text-white hover:text-gray-300 transition-colors">
              Orders
            </Link>
            <Link href="/wishlist" className="relative flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
              <Heart size={24} />
              {getTotalWishlistItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalWishlistItems()}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
              <ShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Size Chart Button - Fixed Position Top Right */}
      <button
        onClick={() => setShowSizeChart(true)}
        className="fixed top-24 right-6 z-30 flex items-center gap-2 px-4 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
      >
        <Ruler size={20} />
        <span>Size Chart</span>
      </button>

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl mb-6">
            Premium{" "}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Shoes
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our handcrafted collection of premium footwear. From running shoes to dress shoes, 
            each pair is designed for comfort, style, and performance.
          </p>
          <p className="mt-4 text-sm text-gray-400">{message}</p>
        </div>

        {/* Search Section */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search by brand, model, or type..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white focus:bg-white/15 transition-all text-lg"
            />
          </div>
          
          {searchQuery && (
            <div className="mt-4 flex items-center gap-2">
              <div className="px-4 py-2 bg-white/10 rounded-full text-sm text-white flex items-center gap-2">
                Searching for: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-gray-300"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Shoe Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentShoes.length > 0 ? (
            currentShoes.map((shoe) => (
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
                    onClick={() => handleWishlistToggle(shoe)}
                    className={`absolute top-4 right-4 p-3 rounded-full transition-all shadow-lg ${
                      isInWishlist(shoe.id)
                        ? "bg-pink-500 text-white scale-110"
                        : "bg-white/90 text-gray-700 hover:bg-pink-500 hover:text-white"
                    }`}
                  >
                    <Heart
                      size={20}
                      fill={isInWishlist(shoe.id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400 uppercase tracking-wide">{shoe.type}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{shoe.brand} {shoe.model}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">Size {shoe.size} — crafted for style and performance.</p>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-white">₱{shoe.price.toLocaleString()}</span>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-1">Added: {new Date(shoe.createdAt).toLocaleDateString()}</div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(shoe)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 text-lg">
              {searchQuery ? `No results found for "${searchQuery}"` : selectedCategory ? `No ${selectedCategory} available.` : "No shoes available yet."}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-20">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currentPage === 1
                  ? "bg-white/5 text-gray-500 cursor-not-allowed"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentPage === pageNumber
                      ? "bg-white text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currentPage === totalPages
                  ? "bg-white/5 text-gray-500 cursor-not-allowed"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Shoe Categories */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-8 text-white">Shop by Shoe Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(category.name)}
                className={`p-6 backdrop-blur-sm rounded-xl border transition-all duration-300 cursor-pointer ${
                  selectedCategory === category.name
                    ? "bg-white/20 border-white/40"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="text-4xl mb-3">{category.emoji}</div>
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
              </div>
            ))}
          </div>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="mt-6 px-6 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-800 rounded-3xl text-center py-20 px-8 shadow-2xl border border-gray-700/50">
          <h2 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
            Stay Real. Stay REALE$T 👟
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            More than sneakers — it's a movement.  
            Elevate your collection, express your style, and step into authenticity.
          </p>
          <div className="flex justify-center mt-10">
            <div className="">
              
            </div>
          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] rounded-2xl border border-white/20 max-w-lg w-full max-h-[600px]">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Ruler size={24} className="text-white" />
                <h2 className="text-2xl font-bold text-white">Size Chart</h2>
              </div>
              <button
                onClick={() => setShowSizeChart(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[480px]">
              <p className="text-gray-400 mb-4 text-sm">
                International size conversion guide for shoes
              </p>
              
              <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/10">
                      <th className="px-4 py-2 text-left text-white font-bold text-sm">US</th>
                      <th className="px-4 py-2 text-left text-white font-bold text-sm">UK</th>
                      <th className="px-4 py-2 text-left text-white font-bold text-sm">EU</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeChart.map((size, index) => (
                      <tr
                        key={size.us}
                        className={`${
                          index % 2 === 0 ? "bg-white/5" : "bg-transparent"
                        } hover:bg-white/10 transition-colors`}
                      >
                        <td className="px-4 py-2 text-white font-semibold text-sm">{size.us}</td>
                        <td className="px-4 py-2 text-gray-300 text-sm">{size.uk}</td>
                        <td className="px-4 py-2 text-gray-300 text-sm">{size.eu}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-gray-400">
                  <span className="font-bold text-white">Note:</span> Sizes may vary slightly between brands. 
                  We recommend measuring your foot for the best fit.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    <img src={selectedShoe.imageUrl} alt={selectedShoe.model} className="w-full h-full object-contain p-4" />
                  ) : (
                    <div className="text-6xl">👟</div>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedShoe.brand} {selectedShoe.model}</h3>
                  <p className="text-gray-400 text-sm mb-2">{selectedShoe.type}</p>
                  <p className="text-2xl font-bold text-white">₱{selectedShoe.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Select Sizes & Quantity</h3>
                <div className="grid grid-cols-2 gap-4">
                  {availableSizes.map(size => {
                    const item = orderItems.find(i => i.size === size);
                    const quantity = item?.quantity || 0;
                    return (
                      <div key={size} className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Size {size}</span>
                          <span className="text-gray-400 text-sm">₱{selectedShoe.price.toLocaleString()}</span>
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
                          <span className="text-white font-bold w-8 text-center">{quantity}</span>
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
                  {orderItems.map(item => (
                    <div key={item.size} className="flex justify-between text-gray-300 mb-2">
                      <span>Size {item.size} × {item.quantity}</span>
                      <span>₱{(selectedShoe.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t border-white/20 mt-4 pt-4 flex justify-between items-center">
                    <span className="text-2xl font-bold text-white">Total</span>
                    <span className="text-3xl font-bold text-white">₱{calculateModalTotal().toLocaleString()}</span>
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