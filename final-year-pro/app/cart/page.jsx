"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../contexts/cartContext";
import { useRouter } from "next/navigation";
import Header from "../head/foot/Header";
import Footer from "../head/foot/Footer";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const calculateSubtotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = calculateSubtotal() > 1000 ? 0 : 100; // Free shipping over ₹1000
  const tax = calculateSubtotal() * 0.18; // 18% GST
  const total = calculateSubtotal() + shippingCost + tax;

  const handleCheckout = () => {
    router.push(`/payment?total=${total}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center">
          <Link href="/products" className="flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 ml-auto">Shopping Cart</h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link href="/products" passHref>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2">
                Explore Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <ul role="list" className="divide-y divide-gray-100">
                  {cart.map((item, index) => (
                    <li key={item.id || index} className="flex p-6 hover:bg-gray-50 transition-colors">
                      <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={128}
                          height={128}
                          className="h-full w-full object-cover object-center transform hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="ml-6 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-lg font-medium text-gray-900 hover:text-purple-600">
                              {item.name}
                            </h3>
                            <p className="ml-4 text-lg font-semibold text-purple-600">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            Category: {item.category}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="hover:bg-purple-50"
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="hover:bg-purple-50"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Order Summary
                </h2>
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">{formatPrice(calculateSubtotal())}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="font-medium text-gray-900">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        formatPrice(shippingCost)
                      )}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Tax (18% GST)</dt>
                    <dd className="font-medium text-gray-900">{formatPrice(tax)}</dd>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <dt className="text-lg font-semibold text-gray-900">Total</dt>
                    <dd className="text-lg font-semibold text-purple-600">{formatPrice(total)}</dd>
                  </div>
                </dl>
                <div className="mt-6 space-y-4">
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6" 
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Free shipping on orders over ₹1,000
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
