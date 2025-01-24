"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCart } from "/app/contexts/cartContext"; // Adjust the path if necessary

export default function Payment() {
  const searchParams = useSearchParams();
  const { cart } = useCart();
  const total = searchParams.get("total") || "0";

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(price);
  };

  const handleCheckout = () => {
    console.log("Placing order...");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" passHref>
            <h1 className="text-2xl font-bold text-gray-800 cursor-pointer">Ambika Novelty</h1>
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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Delivery Information Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium">
              <span className="text-gray-600">DELIVERY</span> <span className="text-gray-900">INFORMATION</span>
            </h2>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input type="text" placeholder="First name" className="w-full border-gray-200" />
                </div>
                <div>
                  <Input type="text" placeholder="Last name" className="w-full border-gray-200" />
                </div>
              </div>

              <div>
                <Input type="email" placeholder="Email address" className="w-full border-gray-200" />
              </div>

              <div>
                <Input type="text" placeholder="Street" className="w-full border-gray-200" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input type="text" placeholder="City" className="w-full border-gray-200" />
                </div>
                <div>
                  <Input type="text" placeholder="State" className="w-full border-gray-200" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input type="text" placeholder="Zipcode" className="w-full border-gray-200" />
                </div>
                <div>
                  <Input type="text" placeholder="Country" className="w-full border-gray-200" />
                </div>
              </div>

              <div>
                <Input type="tel" placeholder="Phone" className="w-full border-gray-200" />
              </div>
            </form>
          </div>

          {/* Cart Totals and Payment Section */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-medium">
                <span className="text-gray-600">TOTAL</span>{" "}
                <span className="text-gray-900">{formatPrice(Number.parseFloat(total))}</span>
              </h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatPrice(Number.parseFloat(total))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Fee</span>
                  <span className="text-gray-900">{formatPrice(0)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-600">Total</span>
                  <span className="text-gray-900">{formatPrice(Number.parseFloat(total))}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-medium">
                <span className="text-gray-600">PAYMENT</span> <span className="text-gray-900">METHOD</span>
              </h2>

              <RadioGroup defaultValue="stripe" className="space-y-4">
                <div className="flex items-center space-x-4 border rounded-lg p-4">
                  <RadioGroupItem value="stripe" id="stripe" />
                  <Label htmlFor="stripe" className="flex-1">
                    <Image src="/images/credit-card.png" alt="Stripe" width={80} height={30} className="h-8 w-auto" />
                  </Label>
                </div>

                <div className="flex items-center space-x-4 border rounded-lg p-4">
                  <RadioGroupItem value="razorpay" id="razorpay" />
                  <Label htmlFor="razorpay" className="flex-1">
                    <Image src="/images/razorpay.png" alt="Razorpay" width={80} height={30} className="h-8 w-auto" />
                  </Label>
                </div>

                <div className="flex items-center space-x-4 border rounded-lg p-4">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex-1">
                    CASH ON DELIVERY
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button className="w-full bg-black text-white hover:bg-gray-900" onClick={handleCheckout}>
              PLACE ORDER
            </Button>
          </div>
        </div>
      </div>

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
    </div>
  );
}
