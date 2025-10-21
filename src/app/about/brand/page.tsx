import Link from "next/link";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";

export default function BrandsPage() {
  const collections = [
    {
      name: "Air Max Elite",
      category: "Running Shoes",
      price: "$299",
      image: "👟",
      description: "Premium running shoes with advanced air cushioning for maximum performance.",
      colors: ["Black", "White", "Red"],
      sizes: ["7-12"]
    },
    {
      name: "Sport Trainer Pro",
      category: "Athletic Shoes",
      price: "$399",
      image: "🏃‍♂️",
      description: "High-performance athletic shoes engineered for champions and serious athletes.",
      colors: ["Blue", "Black", "Gray"],
      sizes: ["6-13"]
    },
    {
      name: "Oxford Classic",
      category: "Dress Shoes",
      price: "$249",
      image: "👞",
      description: "Timeless dress shoes that combine elegance with modern comfort technology.",
      colors: ["Brown", "Black", "Navy"],
      sizes: ["7-12"]
    },
    {
      name: "Hiking Master",
      category: "Outdoor Boots",
      price: "$349",
      image: "🥾",
      description: "Rugged hiking boots built for the great outdoors with waterproof protection.",
      colors: ["Brown", "Black", "Olive"],
      sizes: ["7-13"]
    },
    {
      name: "Comfort Walker",
      category: "Casual Sneakers",
      price: "$199",
      image: "👟",
      description: "All-day comfort sneakers perfect for walking, daily wear, and casual outings.",
      colors: ["White", "Gray", "Navy"],
      sizes: ["6-12"]
    },
    {
      name: "Executive Loafer",
      category: "Business Shoes",
      price: "$449",
      image: "👞",
      description: "Premium leather loafers that command respect in any professional setting.",
      colors: ["Black", "Brown", "Burgundy"],
      sizes: ["7-13"]
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#000000] via-[#1a1a1a] to-[#2d2d2d] text-white">
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
        </div>

        {/* Shoe Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {collections.map((shoe, index) => (
            <div 
              key={index}
              className="group bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              {/* Shoe Image */}
              <div className="bg-gradient-to-br from-white to-gray-200 h-64 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
                {shoe.image}
              </div>

              {/* Shoe Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400 uppercase tracking-wide">{shoe.category}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{shoe.name}</h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{shoe.description}</p>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-white">{shoe.price}</span>
                </div>

                {/* Colors & Sizes */}
                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-1">Available Colors: {shoe.colors.join(", ")}</div>
                  <div className="text-sm text-gray-400">Sizes: {shoe.sizes.join(", ")}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shoe Categories */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-8 text-white">Shop by Shoe Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Running Shoes", emoji: "👟" },
              { name: "Dress Shoes", emoji: "👞" },
              { name: "Sneakers", emoji: "👟" },
              { name: "Boots", emoji: "🥾" }
            ].map((category, index) => (
              <div key={index} className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                <div className="text-4xl mb-3">{category.emoji}</div>
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="text-center bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4 text-white">Get Exclusive Shoe Updates</h2>
          <p className="text-gray-300 mb-6 text-lg">
            Be the first to know about new shoe releases, exclusive deals, and limited edition drops.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
            />
            <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}