import React from 'react';
import { Search, ShoppingCart, User, Heart, Shield } from 'lucide-react';
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/homepage" passHref>
          <h1 className="text-2xl font-bold text-gray-800 cursor-pointer">
            Ambika Novelty
          </h1>
        </Link>

        <div className="flex items-center space-x-4">
          <Input type="search" placeholder="Search..." className="w-64" />
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          <Link href="/login" passHref>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Button>
          <Link href="/admin" passHref>
            <Button variant="ghost" size="icon">
              <Shield className="h-5 w-5 text-red-600" />
              <span className="sr-only">Admin Page</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
