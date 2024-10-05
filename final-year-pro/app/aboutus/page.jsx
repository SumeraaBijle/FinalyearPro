import React from 'react';
// import { FaHandsHelping, FaShippingFast, FaHeart, FaStar } from 'react-icons/fa'; // Importing icons
import Footer from '../aboutus/Footer'; // Import the footer component
import Header from '../aboutus/Header'; // Import the header component
import Link from 'next/link'; // Importing Link from Next.js

const About = () => {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-500 to-yellow-500 h-96 flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-white text-6xl font-bold mb-4">Welcome to Ambika Novelty</h1>
          <p className="text-white text-xl max-w-lg mx-auto">
            Your go-to place for unique and personalized gifts. We make every occasion special with a touch of love.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">Our Story</h2>
          <p className="text-lg leading-relaxed text-gray-600 mb-6">
            Established in 1998, Ambika Novelty has been one of the most trusted shops in the area for over two decades. We take pride in offering a wide range of unique gifts, novelties, and decorative items that suit every occasion. Our commitment to quality, affordability, and customer satisfaction has helped us build lasting relationships with our valued customers.
          </p>
          <p className="text-lg leading-relaxed text-gray-600">
            From birthdays to anniversaries, and every holiday in between, we have something for everyone. Every product is crafted with care,
            ensuring that it not only meets but exceeds your expectations.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-600 mb-8">
            We are dedicated to providing thoughtful and unique gifts that leave a lasting impression.
            Whether it’s a small token of appreciation or a grand gesture of love, we ensure that our products bring happiness and lasting memories.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              {/* <FaHandsHelping className="text-red-500 text-5xl mb-4 mx-auto" /> */}
              <h3 className="text-xl font-semibold mb-2">Handcrafted with Care</h3>
              <p className="text-gray-600">Every product is crafted with love and attention to detail, making it truly one-of-a-kind.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              {/* <FaShippingFast className="text-red-500 text-5xl mb-4 mx-auto" /> */}
              <h3 className="text-xl font-semibold mb-2">Fast and Reliable Delivery</h3>
              <p className="text-gray-600">We ensure your gifts arrive on time, every time. Reliable delivery is our top priority.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              {/* <FaHeart className="text-red-500 text-5xl mb-4 mx-auto" /> */}
              <h3 className="text-xl font-semibold mb-2">Personalized to Perfection</h3>
              <p className="text-gray-600">Our customization options allow you to create gifts that are as unique as the recipient.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              {/* <FaStar className="text-red-500 text-5xl mb-4 mx-auto" /> */}
              <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
              <p className="text-gray-600">Our customers love us! We strive to make every experience a delightful one.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 px-6 bg-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe now & get 20% off</h2>
          <p className="mb-6">Stay updated with our latest products and offers.</p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 border border-gray-400 rounded-l-md focus:outline-none "
            />
            <button className="bg-red-500 text-white p-2 rounded-r-md hover:bg-red-700">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default About;
