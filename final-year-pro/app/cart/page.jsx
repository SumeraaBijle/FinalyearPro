"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Trash2, ChevronLeft, ChevronRight, Search, User, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCart } from "../contexts/cartContext"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const router = useRouter()

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(price)
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCheckout = () => {
    router.push(`/payment?total=${calculateTotal()}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Ambika Novelty</h1>
          <div className="flex items-center space-x-4">
            <Input type="search" placeholder="Search..." className="w-64" />
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Link href="/cart" passHref>
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Link href="/login" passHref>
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Liked Items</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {cart.length === 0 ? (
          <div className="text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h2>
            <p className="mt-1 text-sm text-gray-500">Start shopping to add items to your cart.</p>
            <div className="mt-6">
              <Link href="/" passHref>
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <ul role="list" className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">{formatPrice(calculateTotal())}</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Order total</dt>
                    <dd className="text-base font-medium text-gray-900">{formatPrice(calculateTotal())}</dd>
                  </div>
                </dl>
                <div className="mt-6">
                  <Button className="w-full" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
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
  )
}

