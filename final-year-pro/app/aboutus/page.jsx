"use client"
import Header from "../head/foot/Header";
import Footer from "../head/foot/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-violet-100 relative">
      {/* Enhanced background blur elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-pulse"></div>
        <div className="absolute top-20 -left-40 w-[600px] h-[600px] bg-violet-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-pulse delay-300"></div>
        <div className="absolute bottom-40 right-40 w-[550px] h-[550px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-pulse delay-700"></div>
      </div>

      <Header />

      <main className="container mx-auto px-4 py-8 relative">
        {/* About Us Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600">
            About Us
          </h1>

          {/* Our Story Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 1998, Ambika Novelty began as a small stationery shop with a big dream: to bring joy and creativity into people's lives. Over the years, we’ve grown into a beloved destination for unique gifts, personalized stationery, and thoughtful novelties.
            </p>
            <p className="text-gray-600">
              Our journey has been guided by a simple philosophy: every product should tell a story, and every gift should create a memory. From school supplies to office essentials and special occasion gifts, we’ve curated a collection that reflects our commitment to quality and creativity.
            </p>
          </div>

          {/* Our Mission Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h2>
            <p className="text-gray-600">
              At Ambika Novelty, our mission is to inspire creativity and celebrate life’s special moments. We believe that every gift, no matter how small, has the power to make someone’s day brighter. That’s why we’re dedicated to offering products that are not only beautiful but also meaningful.
            </p>
          </div>

          {/* Why Choose Us Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Feature 1 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Unique & Creative</h3>
                <p className="text-gray-600">
                  Our products are carefully curated to bring a touch of uniqueness and creativity to your life.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Eco-Friendly Options</h3>
                <p className="text-gray-600">
                  We offer a range of eco-friendly products to help you make sustainable choices.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Personalized Touch</h3>
                <p className="text-gray-600">
                  Add a personal touch to your gifts with our customization options.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Customer First</h3>
                <p className="text-gray-600">
                  Your satisfaction is our priority. We’re here to make every experience delightful.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}