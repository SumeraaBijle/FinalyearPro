import React from 'react';
import Link from 'next/link'; // Importing Link from Next.js
import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa'; // Importing icons for cart and login


const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 py-10">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start text-gray-700">
        {/* Logo and Description */}
        <div className="mb-8 md:mb-0">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Ambika<span className="text-pink-500">Novelty</span>
          </h1>
          <p className="text-sm mt-3 max-w-sm text-gray-600">
            Discover a wide range of products with unique designs and quality, made just for you.
          </p>
        </div>
  
        {/* Company Links */}
        <div className="flex flex-col md:flex-row gap-12">
          <div>
            <h4 className="font-semibold text-gray-800 text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="http://localhost:3000/homepage"
                  className="hover:text-pink-500 hover:underline transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:3000/aboutus"
                  className="hover:text-pink-500 hover:underline transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-500 hover:underline transition duration-300"
                >
                  Delivery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-500 hover:underline transition duration-300"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
  
          {/* Get in Touch */}
          <div>
            <h4 className="font-semibold text-gray-800 text-lg mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="font-medium">Phone:</span> 
                <span className="text-pink-500">+1-000-000-0000</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-medium">Email:</span>
                <a
                  href="mailto:ambikanovelty@gmail.com"
                  className="text-pink-500 hover:underline transition duration-300"
                >
                  ambikanovelty@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-pink-500 hover:underline transition duration-300"
                >
                  <img
                    src="/images/insta.jpg"
                    alt="Instagram"
                    className="h-5 w-5"
                  />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
  
      {/* Footer Bottom */}
      <div className="mt-10 text-center text-gray-600 text-sm">
        <p className="flex flex-col md:flex-row justify-center items-center gap-2">
          <span>
            Copyright 2025©{" "}
            <a
              href="http://localhost:3000"
              className="text-pink-500 hover:underline transition duration-300"
            >
              ambikanovelty.com
            </a>
          </span>
          <span className="hidden md:inline-block">|</span>
          <span>All Rights Reserved.</span>
        </p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
