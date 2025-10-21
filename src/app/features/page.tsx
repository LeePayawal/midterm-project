import Link from "next/link";
import { ArrowLeft, Cloud, Wind, Zap, Feather, Droplets, Leaf } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: Cloud,
      title: "CloudFoam Technology",
      description: "Advanced cushioning system that adapts to your unique gait pattern, providing unmatched comfort with every step.",
      color: "text-blue-400"
    },
    {
      icon: Wind,
      title: "Breathable Mesh",
      description: "Premium materials engineered with micro-perforations to keep your feet cool and comfortable all day long.",
      color: "text-cyan-400"
    },
    {
      icon: Zap,
      title: "Durable Sole",
      description: "Engineered for longevity with superior grip technology that performs on any surface, any condition.",
      color: "text-yellow-400"
    },
    {
      icon: Feather,
      title: "Lightweight Design",
      description: "Minimal weight without compromising on support and stability. Feel like you're walking on air.",
      color: "text-purple-400"
    },
    {
      icon: Droplets,
      title: "Water Resistant",
      description: "Advanced hydrophobic coating technology protects against rain, puddles, and unexpected weather.",
      color: "text-blue-500"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Sustainably sourced materials and carbon-neutral manufacturing for a better tomorrow.",
      color: "text-green-400"
    }
  ];

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
            Revolutionary{" "}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Features
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Innovation meets comfort in every stride. Discover the cutting-edge technology that sets us apart from the rest.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <feature.icon className={`w-12 h-12 ${feature.color} mb-6 group-hover:scale-110 transition-transform`} />
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Technology Showcase */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-8 text-white">The Science Behind Comfort</h2>
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h3 className="text-3xl font-bold mb-6 text-white">Advanced Engineering</h3>
                <div className="space-y-4 text-gray-300">
                  <p>Our research team spent over 2 years developing the perfect blend of comfort, durability, and style.</p>
                  <p>Using biomechanical analysis and gait studies from over 10,000 participants, we've created shoes that adapt to you.</p>
                  <p>Every material is tested under extreme conditions to ensure peak performance when you need it most.</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-white to-gray-200 rounded-xl h-80 flex items-center justify-center text-8xl">
                🔬
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Experience the Difference</h2>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            Ready to feel the future of footwear? Explore our collections and discover your perfect pair.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </main>
  );
}
