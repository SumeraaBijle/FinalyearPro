import React from 'react';
import Link from 'next/link'; // Importing Link from Next.js
import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa'; // Importing icons for cart and login


const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="container mx-auto px-6">
        

        {/* Footer Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-600">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-800">Ambika Novelty<span className="text-pink-500">.</span></h1>
            <p className="text-sm max-w-sm mt-3">
              some more info ....
            </p>
          </div>

          {/* Company Links */}
          <div className="flex flex-col md:flex-row gap-8 mb-6 md:mb-0">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">COMPANY</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">About us</a></li>
                <li><a href="#" className="hover:underline">Delivery</a></li>
                <li><a href="#" className="hover:underline">Privacy policy</a></li>
              </ul>
            </div>

            {/* Get In Touch */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">GET IN TOUCH</h4>
              <ul className="space-y-2">
                <li>+1-000-000-0000</li>
                <li>ambikanovelty@gmail.com</li>
                <li><a href="#" className="hover:underline">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-10 text-gray-500 text-sm">
          <p>Copyright 2024© ambikanovelty.com - All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
