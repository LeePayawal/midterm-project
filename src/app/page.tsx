"use client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { 
  ArrowRight, Users, Trophy, Star, Heart, ShoppingCart, Package, 
  ArrowLeft, Filter, Search, TrendingUp, Shield, Truck, Clock, 
  Award, CheckCircle 
} from "lucide-react";

// Sample products based on your dashboard structure
const sampleProducts = [
  {
    id: 1,
    brand: "Nike",
    model: "Air Jordan 1 Retro High",
    type: "Sneakers",
    price: 8500,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    colorway: "Chicago",
    size: "10"
  },
  {
    id: 2,
    brand: "Adidas",
    model: "Ultraboost 22",
    type: "Running Shoes",
    price: 9200,
    imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    colorway: "Core Black",
    size: "9"
  },
  {
    id: 3,
    brand: "Nike",
    model: "Air Max 270",
    type: "Sneakers",
    price: 7500,
    imageUrl: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400&h=400&fit=crop",
    colorway: "Triple White",
    size: "11"
  },
  {
    id: 4,
    brand: "New Balance",
    model: "990v5",
    type: "Running Shoes",
    price: 8800,
    imageUrl: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop",
    colorway: "Grey/Castlerock",
    size: "10"
  },
  {
    id: 5,
    brand: "Clarks",
    model: "Desert Boot",
    type: "Boots",
    price: 7200,
    imageUrl: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop",
    colorway: "Beeswax",
    size: "9"
  },
  {
    id: 6,
    brand: "Allen Edmonds",
    model: "Park Avenue",
    type: "Dress Shoes",
    price: 12000,
    imageUrl: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=400&fit=crop",
    colorway: "Black",
    size: "10"
  },
  {
    id: 7,
    brand: "Nike",
    model: "Air Force 1 '07",
    type: "Sneakers",
    price: 5500,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    colorway: "Triple White",
    size: "11"
  },
  {
    id: 8,
    brand: "Cole Haan",
    model: "Original Grand",
    type: "Dress Shoes",
    price: 8900,
    imageUrl: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=400&fit=crop",
    colorway: "British Tan",
    size: "9"
  },
  {
    id: 9,
    brand: "Timberland",
    model: "6-Inch Premium",
    type: "Boots",
    price: 9500,
    imageUrl: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400&h=400&fit=crop",
    colorway: "Wheat Nubuck",
    size: "10"
  }
];

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState('All');

  // Define the main background gradient
  const mainBg = "bg-gradient-to-b from-[#000000] via-[#1a1a1a] to-[#2d2d2d]";

  const features = [
    {
      title: "100% Authentic",
      description: "Every sneaker is verified by our expert authentication team before shipping",
      colors: "from-gray-500/10 to-gray-400/10 border-gray-500/20 hover:border-gray-400/40",
      emoji: "✓"
    },
    {
      title: "Secure Checkout",
      description: "Military-grade encryption protects your payment information at every step",
      colors: "from-gray-600/10 to-gray-300/10 border-gray-600/20 hover:border-gray-300/40",
      emoji: "🔒"
    },
    {
      title: "Free Shipping",
      description: "Complimentary express delivery on all orders with real-time tracking updates",
      colors: "from-gray-500/10 to-gray-400/10 border-gray-500/20 hover:border-gray-400/40",
      emoji: "🚀"
    }
  ];

  const types = ['All', 'Running Shoes', 'Dress Shoes', 'Sneakers', 'Boots'];
  const priceRanges = ['All', 'Under ₱5,000', '₱5,000 - ₱8,000', '₱8,000 - ₱10,000', 'Over ₱10,000'];
  
  const filterByPrice = (product: typeof sampleProducts[0]) => {
    if (priceRange === 'All') return true;
    if (priceRange === 'Under ₱5,000') return product.price < 5000;
    if (priceRange === '₱5,000 - ₱8,000') return product.price >= 5000 && product.price < 8000;
    if (priceRange === '₱8,000 - ₱10,000') return product.price >= 8000 && product.price < 10000;
    if (priceRange === 'Over ₱10,000') return product.price >= 10000;
    return true;
  };

  const filteredProducts = sampleProducts
    .filter(p => selectedType === 'All' || p.type === selectedType)
    .filter(filterByPrice);

  const renderHomePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#000000] via-[#1a1a1a] to-[#2d2d2d] text-white pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-800/20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 px-6 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-500/10 to-gray-400/10 border border-gray-500/20 rounded-full text-gray-300 text-sm font-medium mb-8 backdrop-blur-sm">
            👟 Trusted by 50,000+ sneakerheads worldwide
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
            Step into premium
            <span className="bg-gradient-to-r from-white via-gray-400 to-gray-600 bg-clip-text text-transparent"> footwear</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
            Discover authentic sneakers from the world's most coveted brands. Every pair verified, every step legendary. Experience the finest collection of premium footwear curated just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage('products')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-400 to-gray-200 text-black font-bold rounded-lg hover:from-gray-500 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Shop Now <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrentPage('about')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-400 text-gray-300 font-bold rounded-lg hover:bg-gray-400 hover:text-black transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="relative max-w-5xl mx-auto mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.colors} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all`}>
                    <span className="text-2xl">{feature.emoji}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Why Choose REALE$T</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Authentication Guarantee</h3>
                  <p className="text-gray-300">Every sneaker undergoes rigorous authentication by our team of experts. We verify authenticity tags, materials, stitching patterns, and more to ensure you receive only genuine products.</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Express Delivery</h3>
                  <p className="text-gray-300">Free express shipping on all orders. Track your package in real-time from our warehouse to your doorstep. Most orders arrive within 2-3 business days nationwide.</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Premium Selection</h3>
                  <p className="text-gray-300">Curated collection of the most sought-after releases and timeless classics. From limited editions to everyday essentials, we've got your perfect pair.</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">24/7 Support</h3>
                  <p className="text-gray-300">Our dedicated customer service team is always ready to help. Whether you have questions about sizing, shipping, or authentication, we're here for you around the clock.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent mb-2">50K+</div>
                <div className="text-gray-400 text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent mb-2">10K+</div>
                <div className="text-gray-400 text-sm">Sneaker Models</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent mb-2">100%</div>
                <div className="text-gray-400 text-sm">Authentic</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent mb-2">4.9/5</div>
                <div className="text-gray-400 text-sm">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Collection Preview */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Featured Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {sampleProducts.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="group bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="bg-gradient-to-br from-white to-gray-200 h-64 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500">
                  <img
                    src={product.imageUrl}
                    alt={`${product.brand} ${product.model}`}
                    className="w-full h-full object-contain p-6"
                  />
                  <button
                    className="absolute top-4 right-4 p-3 rounded-full bg-white/90 text-gray-700 hover:bg-pink-500 hover:text-white transition-all shadow-lg"
                  >
                    <Heart size={20} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400 uppercase tracking-wide">{product.type}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{product.brand} {product.model}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">Size {product.size} — {product.colorway}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-white">₱{product.price.toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => setCurrentPage('products')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <SignInButton mode="modal">
                      <span className="flex items-center gap-2">
                        <ShoppingCart size={20} />
                        Add to Cart
                      </span>
                    </SignInButton>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button 
              onClick={() => setCurrentPage('products')}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              View All Products <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAboutPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#000000] via-[#1a1a1a] to-[#2d2d2d] text-white pt-20">
      <div className="container mx-auto px-4 py-16">
        <button 
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-white via-gray-400 to-gray-600 bg-clip-text text-transparent">
              REALE$T
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your trusted destination for authentic premium sneakers since 2020. We're passionate about connecting sneakerheads with the kicks they love, one verified pair at a time.
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  At REALE$T, we believe everyone deserves access to authentic, premium sneakers without the hassle of verification or inflated prices. We're here to make sneaker shopping simple, safe, and satisfying.
                </p>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  We've built a platform that connects passionate collectors with verified sellers, ensuring every transaction is secure and every product is genuine. Our authentication process is industry-leading, with expert inspectors who know every detail.
                </p>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Our team of sneaker enthusiasts carefully curates each listing, working directly with authorized retailers and trusted sellers to bring you the latest releases and timeless classics at fair market prices.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  From the first Jordan 1 to the latest Yeezy drop, we're dedicated to preserving sneaker culture while making it accessible to everyone who shares our passion.
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-500/20 to-gray-400/20 rounded-xl h-96 flex items-center justify-center text-9xl border border-gray-500/20">
                👟
              </div>
            </div>
          </div>
        </div>

        {/* Story Timeline */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-10 text-white text-center">Our Journey</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="bg-gradient-to-r from-gray-400 to-gray-200 text-black font-bold rounded-lg px-4 py-2 flex-shrink-0">
                2020
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex-1">
                <h3 className="text-xl font-bold text-white mb-2">The Beginning</h3>
                <p className="text-gray-300">Founded by sneaker enthusiasts who were tired of fakes and scams. Started with a simple mission: make authentic sneakers accessible to everyone.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="bg-gradient-to-r from-gray-400 to-gray-200 text-black font-bold rounded-lg px-4 py-2 flex-shrink-0">
                2021
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Rapid Growth</h3>
                <p className="text-gray-300">Reached 10,000 customers and expanded our authentication team. Partnered with major brands and authorized retailers across the country.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="bg-gradient-to-r from-gray-400 to-gray-200 text-black font-bold rounded-lg px-4 py-2 flex-shrink-0">
                2023
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Industry Leader</h3>
                <p className="text-gray-300">Became the most trusted sneaker marketplace in the Philippines. Launched advanced authentication lab with cutting-edge verification technology.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="bg-gradient-to-r from-gray-400 to-gray-200 text-black font-bold rounded-lg px-4 py-2 flex-shrink-0">
                2025
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Today</h3>
                <p className="text-gray-300">Serving 50,000+ happy customers with over 10,000 verified sneaker models. Continuing to innovate and improve the sneaker buying experience.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-10 text-white text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Community First</h3>
              <p className="text-gray-300">Building a trusted community of sneaker enthusiasts who share our passion. Every member matters, every voice is heard.</p>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Quality Guaranteed</h3>
              <p className="text-gray-300">Every sneaker is verified authentic before reaching your doorstep. No exceptions, no compromises on quality.</p>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Customer Satisfaction</h3>
              <p className="text-gray-300">Your happiness is our priority with 24/7 support, easy returns, and a seamless shopping experience from start to finish.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-10 text-white text-center">Our Expert Team</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <p className="text-gray-300 text-center mb-8 text-lg">
              Our authentication team consists of certified sneaker experts with over 50 years of combined experience. They examine every detail from stitching to materials, ensuring only genuine products reach our customers.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="w-20 h-20 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                  👨‍💼
                </div>
                <div className="text-white font-semibold">15+ Experts</div>
                <div className="text-gray-400 text-sm">Authentication Team</div>
              </div>
              <div>
                <div className="w-20 h-20 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                  🎓
                </div>
                <div className="text-white font-semibold">Certified Pros</div>
                <div className="text-gray-400 text-sm">Industry Trained</div>
              </div>
              <div>
                <div className="w-20 h-20 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                  🔍
                </div>
                <div className="text-white font-semibold">100% Check Rate</div>
                <div className="text-gray-400 text-sm">Every Product</div>
              </div>
              <div>
                <div className="w-20 h-20 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                  ⚡
                </div>
                <div className="text-white font-semibold">24-48 Hours</div>
                <div className="text-gray-400 text-sm">Processing Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Start Shopping?</h2>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust REALE$T for their sneaker needs.
          </p>
          <button 
            onClick={() => setCurrentPage('products')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-400 to-gray-200 text-black font-bold rounded-lg hover:from-gray-500 hover:to-gray-300 transition-all duration-300 transform hover:scale-105"
          >
            Browse Collection <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderProductsPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#000000] via-[#1a1a1a] to-[#2d2d2d] text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-5xl font-black tracking-tight text-white">
            Premium <span className="bg-gradient-to-r from-white via-gray-400 to-gray-600 bg-clip-text text-transparent">Collection</span>
          </h1>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search sneakers by brand, model, or colorway..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
              <button className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-all">
                <Filter size={18} />
                Filters
              </button>
              <button className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-all">
                <TrendingUp size={18} />
                Sort By
              </button>
            </div>
          </div>
        </div>

        {/* Type Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">SNEAKER TYPE</h3>
          <div className="flex flex-wrap gap-3">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedType === type
                    ? 'bg-gradient-to-r from-gray-400 to-gray-200 text-black'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">PRICE RANGE</h3>
          <div className="flex flex-wrap gap-3">
            {priceRanges.map((range) => (
              <button
                key={range}
                onClick={() => setPriceRange(range)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  priceRange === range
                    ? 'bg-gradient-to-r from-gray-400 to-gray-200 text-black'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-400">
            Showing <span className="text-white font-semibold">{filteredProducts.length}</span> products
          </p>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <CheckCircle size={16} className="text-green-400" />
            All products verified authentic
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="aspect-square bg-gradient-to-br from-white to-gray-200 relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={`${product.brand} ${product.model}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart size={20} className="text-white" />
                </div>
                <div className="absolute top-3 left-3 bg-gradient-to-r from-gray-400 to-gray-200 text-black text-xs font-bold px-3 py-1 rounded-full">
                  AUTHENTIC
                </div>
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">{product.brand}</span>
                  <h3 className="text-lg font-bold text-white mb-1">{product.model}</h3>
                  <p className="text-sm text-gray-400">{product.colorway}</p>
                </div>
                
                {/* Type Badge */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                    {product.type}
                  </span>
                </div>

                {/* Size Display */}
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-2">Size:</p>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm text-gray-300">
                    US {product.size}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent">
                    ₱{product.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">
                    Free Shipping
                  </div>
                </div>

              <SignInButton mode="modal">
  <button className="w-full py-3 bg-gradient-to-r from-gray-400 to-gray-200 text-black font-semibold rounded-lg hover:from-gray-500 hover:to-gray-300 transition-all flex items-center justify-center gap-2">
    <ShoppingCart size={18} />
    Add to Cart
  </button>
</SignInButton>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/5 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 border border-white/10">
              <Package size={64} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              No products found
            </h2>
            <p className="text-gray-400 mb-8">
              Try adjusting your filters to see more results
            </p>
            <button
              onClick={() => {
                setSelectedType('All');
                setPriceRange('All');
              }}
              className="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-200 text-black font-semibold rounded-lg hover:from-gray-500 hover:to-gray-300 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center py-16 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Unlock Full Access</h2>
            <p className="text-gray-300 mb-6">
              Sign in to access our complete collection of 10,000+ verified sneakers, save favorites to your wishlist, track orders in real-time, and enjoy exclusive member benefits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle size={18} className="text-green-400" />
                <span>Save to Wishlist</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle size={18} className="text-green-400" />
                <span>Track Orders</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle size={18} className="text-green-400" />
                <span>Exclusive Deals</span>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-400 to-gray-200 text-black font-bold rounded-lg hover:from-gray-500 hover:to-gray-300 transition-all duration-300 transform hover:scale-105">
              Sign In Now <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="relative min-h-screen">
      {/* Public Landing Page */}
      <SignedOut>
        {currentPage === 'home' && renderHomePage()}
        {currentPage === 'about' && renderAboutPage()}
        {currentPage === 'products' && renderProductsPage()}
      </SignedOut>

      {/* Signed In State - Welcome Dashboard */}
      <SignedIn>
        <main className={`flex min-h-screen flex-col items-center justify-center ${mainBg} text-white`}>
          {/* Hero Section */}
          <div className="container flex flex-col items-center justify-center gap-16 px-4 py-32">
            <div className="text-center">
              <h1 className="text-6xl font-black tracking-tight text-white sm:text-[7rem] lg:text-[8rem]">
                STEP INTO{" "}
                <span className="bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">
                  GREATNESS
                </span>
              </h1>
              <p className="mt-8 text-xl text-gray-300 sm:text-2xl max-w-3xl">
                Discover premium footwear that combines cutting-edge technology with timeless style. 
                Every step counts, make it legendary.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-400 to-gray-200 text-black font-bold rounded-lg hover:from-gray-500 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Collection <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-400 text-gray-400 font-bold rounded-lg hover:bg-gray-400 hover:text-black transition-all duration-300"
              >
                Our Story
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mt-16">
              <div className="flex flex-col items-center gap-2">
                <Users className="w-8 h-8 text-gray-400" />
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-gray-400">Happy Customers</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Trophy className="w-8 h-8 text-gray-400" />
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-gray-400">Sneaker Models</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Star className="w-8 h-8 text-gray-400" />
                <div className="text-3xl font-bold text-white">4.9/5</div>
                <div className="text-gray-400">Customer Rating</div>
              </div>
            </div>

            {/* Navigation Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-16 w-full max-w-6xl">
              {/* About */}
              <Link
                className="flex flex-col gap-4 rounded-xl bg-gradient-to-br from-gray-900/20 to-gray-800/20 backdrop-blur-sm p-6 text-white hover:from-gray-900/30 hover:to-gray-800/30 border border-gray-500/20 hover:border-gray-500/40 transition-all duration-300 transform hover:scale-105"
                href="/about"
              >
                <h3 className="text-xl font-bold">About →</h3>
                <div className="text-gray-300">
                  Learn more about REALE$T and our mission to deliver premium sneakers with authenticity and style.
                </div>
              </Link>

              {/* Products */}
              <Link
                className="flex flex-col gap-4 rounded-xl bg-gradient-to-br from-gray-800/20 to-gray-700/20 backdrop-blur-sm p-6 text-white hover:from-gray-800/30 hover:to-gray-700/30 border border-gray-400/20 hover:border-gray-400/40 transition-all duration-300 transform hover:scale-105"
                href="/dashboard"
              >
                <h3 className="text-xl font-bold">Products →</h3>
                <div className="text-gray-300">
                  Explore our exclusive collection of sneakers curated for sneakerheads worldwide.
                </div>
              </Link>

              {/* Features */}
              <Link
                className="flex flex-col gap-4 rounded-xl bg-gradient-to-br from-gray-900/20 to-gray-800/20 backdrop-blur-sm p-6 text-white hover:from-gray-900/30 hover:to-gray-800/30 border border-gray-500/20 hover:border-gray-500/40 transition-all duration-300 transform hover:scale-105"
                href="/features"
              >
                <h3 className="text-xl font-bold">Features →</h3>
                <div className="text-gray-300">
                  Discover cutting-edge features that make buying and managing sneakers effortless.
                </div>
              </Link>

              {/* Contact */}
              <Link
                className="flex flex-col gap-4 rounded-xl bg-gradient-to-br from-gray-800/20 to-gray-900/20 backdrop-blur-sm p-6 text-white hover:from-gray-800/30 hover:to-gray-900/30 border border-gray-400/20 hover:border-gray-400/40 transition-all duration-300 transform hover:scale-105"
                href="/contact"
              >
                <h3 className="text-xl font-bold">Contact →</h3>
                <div className="text-gray-300">
                  Get in touch with us for inquiries, collaborations, or customer support.
                </div>
              </Link>
            </div>
          </div>
        </main>
      </SignedIn>
    </main>
  );
}