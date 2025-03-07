"use client"
import Header from "../head/foot/Header"
import Link from "next/link"
import Footer from "../head/foot/Footer"
import StationeryGiftChatBot from "@/components/ui/StationeryGiftChatBot"
import FeaturedProducts from "@/components/ui/FeaturedProducts"
import { motion } from "framer-motion"

export default function AmbikaNoveltySite() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-100 relative font-serif">
      {/* Enhanced animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-pink-300 rounded-full mix-blend-multiply filter blur-[150px] opacity-30"
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-20 -left-40 w-[800px] h-[800px] bg-violet-300 rounded-full mix-blend-multiply filter blur-[150px] opacity-30"
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.25, 0.35, 0.25],
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-40 right-40 w-[750px] h-[750px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[150px] opacity-30"
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1.1, 0.9, 1.1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"
        ></motion.div>
      </div>

      <Header />

      <main className="container mx-auto px-4 py-8 relative z-10 font-serif">
        {/* Enhanced Luxury Hero Section with premium feel */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mb-24 py-20 relative overflow-hidden"
        >
          {/* Stylish background pattern */}
          <div className="absolute inset-0 opacity-5 bg-[url('/pattern-dots.svg')] bg-repeat"></div>
          
          {/* Enhanced decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-violet-500 opacity-40 rounded-tl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-pink-500 opacity-40 rounded-br-3xl"></div>

          {/* New floating shapes */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-16 -left-16 w-64 h-64 border-8 border-pink-300/30 rounded-full"
          ></motion.div>
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -right-20 w-80 h-80 border-8 border-violet-300/30 rounded-full"
          ></motion.div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            {/* Hero content */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="md:w-1/2 text-center md:text-left"
            >
              <motion.h1 
                className="text-6xl lg:text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 leading-tight font-serif"
                animate={{ 
                  backgroundPosition: ['0% center', '100% center', '0% center'],
                }}
                transition={{ 
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: '200% auto',
                }}
              >
                Welcome to Ambika Novelty
              </motion.h1>
              <p className="text-2xl text-gray-700 mb-10 font-light font-serif">
                Discover our curated collection of premium stationery and unique gift items
              </p>
              <motion.div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 15px 30px -10px rgba(147, 51, 234, 0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-violet-600 to-pink-600 text-white px-10 py-4 rounded-full text-xl font-semibold shadow-lg transition-all duration-300 relative overflow-hidden group font-serif"
                  onClick={() => window.location.href = "/products"}
                >
                  <span className="relative z-10">Explore Collection</span>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                </motion.button>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 15px 30px -10px rgba(109, 40, 217, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-violet-700 border-2 border-violet-500 px-8 py-4 rounded-full text-xl font-semibold shadow-md transition-all duration-300 font-serif"
                  onClick={() => window.location.href = "/special-offers"}
                >
                  Special Offers
                </motion.button>
              </motion.div>
              
              {/* Social proof */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-12 pt-8 border-t border-purple-200 flex items-center justify-center md:justify-start gap-6"
              >
                <div className="flex -space-x-4">
                  <div className="w-10 h-10 rounded-full bg-violet-400 border-2 border-white flex items-center justify-center text-white text-xs font-serif">JD</div>
                  <div className="w-10 h-10 rounded-full bg-pink-400 border-2 border-white flex items-center justify-center text-white text-xs font-serif">MR</div>
                  <div className="w-10 h-10 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-serif">SK</div>
                  <div className="w-10 h-10 rounded-full bg-violet-600 border-2 border-white flex items-center justify-center text-white text-xs font-serif">+8</div>
                </div>
                <p className="text-gray-600 text-sm font-serif">
                  <span className="font-semibold">4.9/5</span> from over <span className="font-semibold">2,500+</span> happy customers
                </p>
              </motion.div>
            </motion.div>
            
            {/* Hero image/illustration */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="md:w-1/2 relative"
            >
              {/* Main product showcase */}
              <div className="relative mx-auto w-full max-w-lg">
                {/* Decorative background for product */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-pink-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                
                {/* Product card with glass morphism */}
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-36 h-36 bg-violet-100 rounded-full"></div>
                  <div className="absolute -left-10 -bottom-10 w-36 h-36 bg-pink-100 rounded-full"></div>
                  
                  {/* Product image grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
                    <div className="aspect-square bg-gradient-to-br from-violet-100 to-purple-50 rounded-2xl p-4 flex items-center justify-center shadow-md">
                      <div className="text-6xl">📚</div>
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-50 rounded-2xl p-4 flex items-center justify-center shadow-md">
                      <div className="text-6xl">✏️</div>
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-indigo-100 to-blue-50 rounded-2xl p-4 flex items-center justify-center shadow-md">
                      <div className="text-6xl">🎁</div>
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-purple-100 to-violet-50 rounded-2xl p-4 flex items-center justify-center shadow-md">
                      <div className="text-6xl">🖌️</div>
                    </div>
                  </div>
                  
                  {/* Featured product details */}
                  <div className="text-center p-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
                    <h3 className="font-bold text-lg text-violet-800 font-serif">Best Sellers Collection</h3>
                    <p className="text-violet-600 font-serif">Handpicked premium products</p>
                  </div>
                  
                  {/* Floating badges */}
                  <motion.div 
                    className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-1 px-3 rounded-full text-sm font-bold shadow-lg font-serif"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    New!
                  </motion.div>
                  <motion.div 
                    className="absolute bottom-4 left-4 bg-gradient-to-r from-violet-500 to-indigo-500 text-white py-1 px-3 rounded-full text-sm font-bold shadow-lg font-serif"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    Limited Edition
                  </motion.div>
                </div>
              </div>
              
              {/* Animated elements */}
              <motion.div 
                className="absolute -top-8 -right-8 text-7xl"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 15, 0],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.div>
              
              <motion.div 
                className="absolute bottom-14 left-14 text-6xl"
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -15, 0],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                📝
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Premium Featured Products section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24 pb-10 pt-12 bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl relative overflow-hidden"
        >
          {/* Glass morphism effect with border highlights */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/20 rounded-3xl"></div>
          <div className="absolute inset-0 border border-white/30 rounded-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500"></div>
          
          <div className="relative z-10">
            <motion.h2 
              className="text-6xl font-bold text-center mb-6 font-serif"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              
            </motion.h2>
            
            <FeaturedProducts />
          </div>
        </motion.section>

        {/* Luxurious Special Offers Banner */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/90 via-purple-500/90 to-pink-500/90 rounded-3xl transform rotate-1 scale-[1.02] opacity-70 blur-sm"></div>
          <div className="backdrop-blur-xl bg-gradient-to-r from-violet-500/90 via-purple-500/90 to-pink-500/90 text-white py-16 px-10 rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 relative z-10">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-6 flex items-center justify-center gap-4 font-serif">
                <span className="relative">
                  Special Offers!
                  <motion.span 
                    className="absolute -top-8 -right-10 text-3xl transform rotate-12"
                    animate={{ 
                      rotate: [12, 20, 12],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🎁
                  </motion.span>
                </span>
              </h2>
              <p className="text-2xl mb-12 font-light font-serif">Get up to 50% off on selected items</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div 
                  whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  className="bg-white/20 p-8 rounded-xl border border-white/30 backdrop-blur-sm shadow-lg transition-all duration-300 group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📚</div>
                  <h3 className="font-bold text-2xl mb-3 font-serif">Buy 2 Get 1 Free</h3>
                  <p className="opacity-90 text-lg font-serif">On all notebooks</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  className="bg-white/20 p-8 rounded-xl border border-white/30 backdrop-blur-sm shadow-lg transition-all duration-300 group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎓</div>
                  <h3 className="font-bold text-2xl mb-3 font-serif">20% Student Discount</h3>
                  <p className="opacity-90 text-lg font-serif">With valid ID</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  className="bg-white/20 p-8 rounded-xl border border-white/30 backdrop-blur-sm shadow-lg transition-all duration-300 group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🚚</div>
                  <h3 className="font-bold text-2xl mb-3 font-serif">Free Shipping</h3>
                  <p className="opacity-90 text-lg font-serif">On orders above ₹999</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Enhanced Categories Section with more attractive hover effects */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-5xl font-bold text-center mb-12 font-serif">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600">
              Explore Categories
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* School Supplies */}
            <Link href="/products?category=School-supplies">
              <div className="relative h-96 rounded-2xl overflow-hidden group transform hover:scale-105 transition-transform duration-500 shadow-xl cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6"
                  alt="School Supplies"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-t from-black/70 via-black/40 to-black/20 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-bold mb-4 font-serif">School Supplies</h3>
                    <button className="backdrop-blur-md bg-white/90 text-black px-8 py-3 rounded-full hover:bg-white transform hover:scale-105 transition-all duration-300 font-medium font-serif">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>

            {/* Office Essentials */}
            <Link href="/products?category=Office-essentials">
              <div className="relative h-96 rounded-2xl overflow-hidden group transform hover:scale-105 transition-transform duration-500 shadow-xl cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc"
                  alt="Office Essentials"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-t from-black/70 via-black/40 to-black/20 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-bold mb-4 font-serif">Office Essentials</h3>
                    <button className="backdrop-blur-md bg-white/90 text-black px-8 py-3 rounded-full hover:bg-white transform hover:scale-105 transition-all duration-300 font-medium font-serif">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>

            {/* Gift Items */}
            <Link href="/products?category=Gift-items">
              <div className="relative h-96 rounded-2xl overflow-hidden group transform hover:scale-105 transition-transform duration-500 shadow-xl cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48"
                  alt="Gift Items"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-t from-black/70 via-black/40 to-black/20 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-bold mb-4 font-serif">Gift Items</h3>
                    <button className="backdrop-blur-md bg-white/90 text-black px-8 py-3 rounded-full hover:bg-white transform hover:scale-105 transition-all duration-300 font-medium font-serif">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </motion.section>

        {/* Enhanced Newsletter Section with better visual design */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 bg-white/90 backdrop-blur-xl rounded-3xl p-16 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500"></div>
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-violet-100 rounded-full opacity-50"></div>
          <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-pink-100 rounded-full opacity-50"></div>
          
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6 font-serif">Stay Updated</h2>
            <p className="text-gray-600 mb-10 text-lg font-serif">Subscribe to our newsletter for exclusive offers and updates</p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner font-serif"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-gradient-to-r from-violet-600 to-pink-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-serif"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.section>

        {/* Enhanced Limited Time Offer Banner */}
        <section className="mb-16 backdrop-blur-xl bg-gradient-to-r from-yellow-100/70 via-orange-100/70 to-pink-100/70 p-12 rounded-2xl border border-yellow-200/50 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 font-serif">Limited Time Offer!</h2>
                <p className="text-lg text-gray-600 font-serif">Get an extra 10% off on your first purchase</p>
                <p className="text-sm text-gray-500 mt-2 font-serif">Use code: WELCOME10</p>
              </div>
              <button
                onClick={() => window.location.href = "http://localhost:3000/products"}
                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 font-serif"
              >
                Shop Now
              </button>
            </div>
          </div>
        </section>
      </main>

      <StationeryGiftChatBot />
      <Footer />
    </div>
  )
}