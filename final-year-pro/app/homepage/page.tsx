"use client"
import Header from "../head/foot/Header"
import Link from "next/link"
import Footer from "../head/foot/Footer"
import StationeryGiftChatBot from "@/components/ui/StationeryGiftChatBot"
import FeaturedProducts from "@/components/ui/FeaturedProducts"
import { motion } from "framer-motion"

export default function AmbikaNoveltySite() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-violet-100 relative">
      {/* Enhanced background blur elements with smoother animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-float"></div>
        <div className="absolute top-20 -left-40 w-[600px] h-[600px] bg-violet-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-40 right-40 w-[550px] h-[550px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-float-slow"></div>
      </div>

      <Header />

      <main className="container mx-auto px-4 py-8 relative">
        {/* New Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center py-20"
        >
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600">
            Welcome to Ambika Novelty
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover our curated collection of premium stationery and unique gift items
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-violet-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-shadow"
            onClick={() => window.location.href = "/products"}
          >
            Explore Collection
          </motion.button>
        </motion.section>

        {/* Featured Products with motion */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <FeaturedProducts />
        </motion.section>

        {/* Enhanced Special Offers Banner */}
        <section className="mb-12 backdrop-blur-xl bg-gradient-to-r from-violet-500/80 via-purple-500/80 to-pink-500/80 text-white py-12 rounded-2xl shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Special Offers!</h2>
            <p className="text-xl mb-6">Get up to 50% off on selected items</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/20 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Buy 2 Get 1 Free</h3>
                <p>On all notebooks</p>
              </div>
              <div className="bg-white/20 p-4 rounded-lg">
                <h3 className="font-bold mb-2">20% Student Discount</h3>
                <p>With valid ID</p>
              </div>
              <div className="bg-white/20 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Free Shipping</h3>
                <p>On orders above ₹999</p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Categories Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-5xl font-bold text-center mb-12">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600">
              Explore Categories
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* School Supplies */}
            <Link href="/products?category=School-supplies">
              <div className="relative h-80 rounded-2xl overflow-hidden group transform hover:scale-105 transition-transform duration-300 shadow-xl cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6"
                  alt="School Supplies"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-2xl font-bold mb-2">School Supplies</h3>
                    <button className="backdrop-blur-md bg-white/80 text-black px-6 py-2 rounded-full hover:bg-white transform hover:scale-105 transition-all duration-300">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>

            {/* Office Essentials */}
            <Link href="/products?category=Office-essentials">
              <div className="relative h-80 rounded-2xl overflow-hidden group transform hover:scale-105 transition-transform duration-300 shadow-xl cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc"
                  alt="Office Essentials"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-2xl font-bold mb-2">Office Essentials</h3>
                    <button className="backdrop-blur-md bg-white/80 text-black px-6 py-2 rounded-full hover:bg-white transform hover:scale-105 transition-all duration-300">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>

            {/* Gift Items */}
            <Link href="/products?category=Gift-items">
              <div className="relative h-80 rounded-2xl overflow-hidden group transform hover:scale-105 transition-transform duration-300 shadow-xl cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48"
                  alt="Gift Items"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-2xl font-bold mb-2">Gift Items</h3>
                    <button className="backdrop-blur-md bg-white/80 text-black px-6 py-2 rounded-full hover:bg-white transform hover:scale-105 transition-all duration-300">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </motion.section>

        {/* New Newsletter Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-xl"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
            <p className="text-gray-600 mb-8">Subscribe to our newsletter for exclusive offers and updates</p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-violet-600 to-pink-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition-shadow"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.section>

        {/* Enhanced Limited Time Offer Banner */}
        <section className="mb-16 backdrop-blur-xl bg-gradient-to-r from-yellow-100/70 via-orange-100/70 to-pink-100/70 p-12 rounded-2xl border border-yellow-200/50 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Limited Time Offer!</h2>
                <p className="text-lg text-gray-600">Get an extra 10% off on your first purchase</p>
                <p className="text-sm text-gray-500 mt-2">Use code: WELCOME10</p>
              </div>
              <button
                onClick={() => window.location.href = "http://localhost:3000/products"}
                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transform hover:scale-105 transition-all duration-200"
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