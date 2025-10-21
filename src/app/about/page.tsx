import Link from "next/link";
import { Award, Heart, Globe, ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#000000] via-[#1a1a1a] to-[#2d2d2d] text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl mb-6">
            Our <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Story</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Born from passion, driven by innovation. We believe everyone deserves footwear that performs as beautifully as it looks.
          </p>
        </div>

        {/* Story Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-white">The Beginning</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Founded in 2025, REALE$T emerged from a simple belief: everyone deserves footwear that performs as beautifully as it looks. Our journey began in a small workshop where passion met precision.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4 text-white">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Today, we're proud to craft shoes that don't just follow trends—they set them. Each pair represents countless hours of research, design, and refinement.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4 text-white">The Future</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                From the boardroom to the basketball court, from city streets to mountain trails, REALE$T is engineered for life's every moment.
              </p>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-12 transform hover:scale-105 transition-transform duration-500">
              <div className="bg-gradient-to-br from-white to-gray-200 rounded-xl h-80 flex items-center justify-center text-8xl">
                👟
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white text-black p-4 rounded-full">
              <Award className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">Passion</h3>
              <p className="text-gray-300">Every shoe is crafted with love and dedication to excellence.</p>
            </div>
            <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Globe className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">Sustainability</h3>
              <p className="text-gray-300">Committed to eco-friendly practices and sustainable materials.</p>
            </div>
            <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">Quality</h3>
              <p className="text-gray-300">Uncompromising standards in design, materials, and craftsmanship.</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-12 text-white">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-gray-400">Unique Designs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">25</div>
              <div className="text-gray-400">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-gray-400">Customer Rating</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Explore Our Collections
          </Link>
        </div>
      </div>
    </main>
  );
}