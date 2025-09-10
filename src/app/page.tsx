import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";


export default function HomePage() {
  return (
    <main className="min-h-screen scroll-smooth bg-gradient-to-br from-slate-900 via-gray-900 to-emerald-900">
      {/* Navigation */}
      
      
      <SignedOut>
        {/* Hero */}
        <section id="home" className="pt-8 pb-16 px-6 relative overflow-hidden">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-cyan-900/20 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm font-medium mb-8 backdrop-blur-sm">
                🚀 Trusted by 50,000+ users worldwide
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
                The smartest way to choose your next
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"> smartphone</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
                Expert reviews, comprehensive comparisons, and data-driven insights to help you make informed decisions in the mobile technology landscape.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
                >
                  Explore Platform
                </Link>
                <Link
                  href="#about"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-emerald-500/30 text-emerald-300 rounded-lg text-lg font-semibold hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-all backdrop-blur-sm"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative max-w-5xl mx-auto">
              <div className="bg-gradient-to-r from-slate-800/50 to-gray-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-emerald-500/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-slate-800/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-emerald-500/10">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-2xl">📱</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Latest Reviews</h3>
                    <p className="text-gray-300 text-sm">In-depth analysis of newest devices</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-800/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-emerald-500/10">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Performance Data</h3>
                    <p className="text-gray-300 text-sm">Real-world benchmarks and tests</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-800/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-emerald-500/10">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Smart Matching</h3>
                    <p className="text-gray-300 text-sm">Find devices that fit your needs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 bg-gradient-to-br from-gray-900/90 via-slate-900/90 to-emerald-900/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why professionals trust PhoneWorld
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We combine rigorous testing methodologies with expert analysis to deliver insights that matter for your decision-making process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🔬",
                  title: "Scientific Testing",
                  desc: "Laboratory-grade testing protocols ensure accurate, reproducible results across all device categories.",
                  gradient: "from-emerald-500/20 to-cyan-500/20",
                },
                {
                  icon: "📊",
                  title: "Data-Driven Analysis",
                  desc: "Advanced analytics and machine learning algorithms provide objective performance insights.",
                  gradient: "from-cyan-500/20 to-emerald-500/20",
                },
                {
                  icon: "🏆",
                  title: "Industry Recognition",
                  desc: "Trusted by tech journalists, industry analysts, and technology companies worldwide.",
                  gradient: "from-emerald-500/20 to-cyan-500/20",
                },
                {
                  icon: "🔄",
                  title: "Real-Time Updates",
                  desc: "Continuous monitoring and updates ensure you always have access to the latest information.",
                  gradient: "from-cyan-500/20 to-emerald-500/20",
                },
                {
                  icon: "🛡️",
                  title: "Unbiased Reviews",
                  desc: "Independent testing with no manufacturer influence guarantees authentic, trustworthy evaluations.",
                  gradient: "from-emerald-500/20 to-cyan-500/20",
                },
                {
                  icon: "🎯",
                  title: "Personalized Recommendations",
                  desc: "AI-powered matching system considers your specific needs, budget, and usage patterns.",
                  gradient: "from-cyan-500/20 to-emerald-500/20",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-800/60 to-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-500/20 hover:border-emerald-400/30"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-emerald-900/95">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our research methodology
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A systematic approach that combines quantitative testing with qualitative analysis to provide comprehensive device evaluations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Acquisition & Setup",
                  desc: "Devices are acquired through retail channels and prepared using standardized protocols to ensure consistency.",
                },
                {
                  step: "02",
                  title: "Performance Testing",
                  desc: "Comprehensive benchmarking across CPU, GPU, battery, camera, and connectivity performance metrics.",
                },
                {
                  step: "03",
                  title: "Real-World Analysis",
                  desc: "Extended usage testing in various scenarios to evaluate practical performance and user experience.",
                },
                {
                  step: "04",
                  title: "Expert Review",
                  desc: "Final analysis by industry experts who synthesize data into actionable insights and recommendations.",
                },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-full text-xl font-bold mb-6 shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-24 bg-gradient-to-r from-slate-900 via-gray-900 to-emerald-900 text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-16">Trusted by the industry</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { num: "50,000+", label: "Active Users" },
                { num: "1,200+", label: "Device Reviews" },
                { num: "150+", label: "Brand Partnerships" },
                { num: "99.8%", label: "Uptime" },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">{stat.num}</div>
                  <div className="text-gray-300 text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 bg-gradient-to-br from-gray-900/95 via-slate-900/95 to-emerald-900/95">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  About PhoneWorld
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  Founded by a team of technology journalists and industry analysts, PhoneWorld was created to address the need for objective, comprehensive smartphone evaluations in an increasingly complex market.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  Our mission is to democratize access to professional-grade technology analysis, enabling consumers and businesses to make informed decisions based on rigorous testing and expert insights.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full border-2 border-slate-800"></div>
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full border-2 border-slate-800"></div>
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full border-2 border-slate-800"></div>
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full border-2 border-slate-800"></div>
                  </div>
                  <span className="text-gray-300">Meet our expert team</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-800/60 to-gray-800/60 backdrop-blur-sm rounded-3xl p-12 border border-emerald-500/20">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"></div>
                    <span className="text-gray-300">ISO 9001 certified testing processes</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"></div>
                    <span className="text-gray-300">Partnership with leading manufacturers</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
                    <span className="text-gray-300">Featured in major tech publications</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"></div>
                    <span className="text-gray-300">24/7 customer support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 bg-gradient-to-br from-slate-900/90 via-gray-900/90 to-emerald-900/90">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get in touch
            </h2>
            <p className="text-xl text-gray-300 mb-16">
              Have questions about our platform or need assistance with device selection? Our team is here to help.
            </p>
            
            <div className="bg-gradient-to-br from-slate-800/60 to-gray-800/60 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-emerald-500/20">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-6 py-4 bg-slate-800/50 border border-emerald-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-6 py-4 bg-slate-800/50 border border-emerald-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Company (Optional)"
                  className="w-full px-6 py-4 bg-slate-800/50 border border-emerald-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                />
                <textarea
                  rows={6}
                  placeholder="How can we help you?"
                  className="w-full px-6 py-4 bg-slate-800/50 border border-emerald-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-white placeholder-gray-400 backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-slate-900 via-gray-900 to-emerald-900 py-16 text-gray-300 border-t border-emerald-500/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-2">
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-6">PhoneWorld</div>
                <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                  Professional smartphone analysis and reviews for consumers and businesses worldwide.
                </p>
                <div className="flex space-x-4">
                  {["Twitter", "LinkedIn", "YouTube"].map((social) => (
                    <Link
                      key={social}
                      href="#"
                      className="w-10 h-10 bg-gradient-to-r from-slate-800/60 to-gray-800/60 rounded-lg flex items-center justify-center hover:from-emerald-600/20 hover:to-cyan-600/20 transition-all border border-emerald-500/20 hover:border-emerald-400/30"
                    >
                      <span className="text-sm">{social.charAt(0)}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-6">Platform</h4>
                <ul className="space-y-3">
                  <li><Link href="#" className="hover:text-emerald-400 transition-colors">Reviews</Link></li>
                  <li><Link href="#" className="hover:text-emerald-400 transition-colors">Comparisons</Link></li>
                  <li><Link href="#" className="hover:text-emerald-400 transition-colors">Database</Link></li>
                  <li><Link href="#" className="hover:text-emerald-400 transition-colors">API</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-6">Company</h4>
                <ul className="space-y-3">
                  <li><Link href="#" className="hover:text-emerald-400 transition-colors">About</Link></li>
                  <li><Link href="#" className="hover:text-emerald-400 transition-colors">Careers</Link></li>
                  <li><Link href="#" className="hover:text-emerald-400 transition-colors">Privacy</Link></li>
                  <li><Link href="#" className="hover:text-emerald-400 transition-colors">Terms</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-emerald-500/20 mt-16 pt-8 text-center text-gray-400">
              <p>© {new Date().getFullYear()} PhoneWorld. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </SignedOut>

      {/* Signed In Dashboard */}
<SignedIn>
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-emerald-900 flex items-center justify-center p-6">
    <div className="bg-gradient-to-br from-slate-800/60 to-gray-800/60 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center max-w-2xl border border-emerald-500/20">
      <div className="w-20 h-20 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
        <span className="text-3xl">🤔</span>
      </div>
      <h1 className="text-4xl font-bold text-white mb-6">
        Coming Soon...
      </h1>
      <p className="text-xl text-gray-300 mb-4">
        We’re still thinking about the website.  
      </p>
      <p className="text-lg text-gray-400 italic mb-8">
        (Our devs team is still deciding… mostly because they’re too busy napping)
      </p>
      <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 text-emerald-300 rounded-lg border border-emerald-500/20 backdrop-blur-sm">
        🚧 Please check back after more coffee ☕
      </div>
    </div>
  </div>
</SignedIn>

    </main>
  );
}