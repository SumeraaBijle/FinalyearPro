import React from 'react';
import Link from 'next/link'; // Importing Link from Next.js
import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa'; // Importing icons for cart and login

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-red-500">
          Ambika Novelty
        </Link>
        <nav className="flex space-x-4">
          <Link href="/" className="text-gray-800 hover:text-red-500">
            Home
          </Link>
          <Link href="/shop" className="text-gray-800 hover:text-red-500">
            Shop
          </Link>
          <Link href="/about" className="text-gray-800 hover:text-red-500">
            About Us
          </Link>
          <Link href="/login" className="text-gray-800 hover:text-red-500 flex items-center">
            <FaSignInAlt className="mr-1" /> Login
          </Link>
          <Link href="/cart" className="text-gray-800 hover:text-red-500 flex items-center">
            <FaShoppingCart className="mr-1" /> Cart
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
