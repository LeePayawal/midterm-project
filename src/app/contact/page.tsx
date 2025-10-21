import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Mail, Globe, Clock, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Flagship Store",
      details: "0433 San Nicolas Sta Ana Pampanga City",
      subtext: "Open Mon-Sat 10AM-8PM, Sun 12PM-6PM"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+63 912 345 6789",
      subtext: "Customer service available 24/7"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@reale$t.com",
      subtext: "We'll respond within 24 hours"
    },
    {
      icon: Globe,
      title: "Online Support",
      details: "Live Chat Available",
      subtext: "Get instant help with our chat support"
    }
  ];

  const socialLinks = [
    { icon: Instagram, name: "Instagram", handle: "@reale$t" },
    { icon: Twitter, name: "Twitter", handle: "@reale$t_shoes" },
    { icon: Facebook, name: "Facebook", handle: "REALE$T Footwear" },
    { icon: Youtube, name: "YouTube", handle: "REALE$T Official" }
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
            Get In{" "}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to step into greatness? We'd love to hear from you. 
            Whether you have questions, feedback, or just want to say hello.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
            
            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1 text-lg">{info.title}</h3>
                    <p className="text-gray-300 mb-1">{info.details}</p>
                    <p className="text-gray-400 text-sm">{info.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                    <social.icon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-white font-medium">{social.name}</div>
                      <div className="text-gray-400 text-sm">{social.handle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-8">Send Us a Message</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="john.doe@example.com"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Subject</label>
                <select className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-white transition-colors">
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Customer Support</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                  <option value="media">Media & Press</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors resize-none"
                ></textarea>
              </div>
              
              <button className="w-full px-6 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors">
                Send Message
              </button>

              <p className="text-gray-400 text-sm text-center">
                We typically respond within 24 hours. For urgent matters, please call us directly.
              </p>
            </div>
          </div>
        </div>

        {/* Store Hours */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-6">Store Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <div className="font-semibold text-white">Monday - Friday</div>
                <div className="text-gray-300">10:00 AM - 8:00 PM</div>
              </div>
              <div>
                <div className="font-semibold text-white">Saturday</div>
                <div className="text-gray-300">10:00 AM - 6:00 PM</div>
              </div>
              <div>
                <div className="font-semibold text-white">Sunday</div>
                <div className="text-gray-300">12:00 PM - 5:00 PM</div>
              </div>
              <div>
                <div className="font-semibold text-white">Holidays</div>
                <div className="text-gray-300">Varies - Check website</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What is your return policy?",
                answer: "We offer a 30-day return policy for all unworn shoes in original packaging. Free returns for members."
              },
              {
                question: "Do you offer international shipping?",
                answer: "Yes! We ship to over 25 countries worldwide. Shipping costs and delivery times vary by location."
              },
              {
                question: "How do I find my perfect size?",
                answer: "Use our interactive size guide or visit our flagship store for a professional fitting consultation."
              },
              {
                question: "Are your shoes sustainable?",
                answer: "Absolutely! We use eco-friendly materials and carbon-neutral manufacturing processes in all our collections."
              },
              {
                question: "Do you offer corporate discounts?",
                answer: "Yes, we have special pricing for bulk orders and corporate partnerships. Contact us for details."
              },
              {
                question: "How can I track my order?",
                answer: "You'll receive a tracking number via email once your order ships. You can also track orders in your account."
              }
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}

      
      </div>
    </main>
  );
}

