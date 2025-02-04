"use client";

import { useState } from "react";
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
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(price);
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    if (paymentMethod === "razorpay") {
      const res = await loadRazorpay();

      if (!res) {
        alert("Razorpay SDK failed to load. Check your internet connection.");
        return;
      }

      try {
        // Create order on backend
        const response = await fetch("/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: total, currency: "INR" }),
        });

        const order = await response.json();

        if (!order.id) {
          alert("Failed to create order. Try again.");
          return;
        }

        // Configure Razorpay options
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          order_id: order.id,
          name: "Ambika Novelty",
          description: "Thank you for shopping with us!",
          handler: function (response) {
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          },
          prefill: {
            name: "Your Name",
            email: "your-email@example.com",
            contact: "9999999999",
          },
          theme: { color: "#3399cc" },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      } catch (error) {
        console.error("Payment Error:", error);
        alert("Something went wrong. Try again.");
      }
    } else {
      alert("Please select Razorpay as the payment method.");
    }
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
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Link href="/login" passHref>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-xl font-medium">
              <span className="text-gray-600">DELIVERY</span> <span className="text-gray-900">INFORMATION</span>
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input type="text" placeholder="First name" className="w-full border-gray-200" />
                <Input type="text" placeholder="Last name" className="w-full border-gray-200" />
              </div>
              <Input type="email" placeholder="Email address" className="w-full border-gray-200" />
              <Input type="text" placeholder="Street" className="w-full border-gray-200" />
              <div className="grid grid-cols-2 gap-4">
                <Input type="text" placeholder="City" className="w-full border-gray-200" />
                <Input type="text" placeholder="State" className="w-full border-gray-200" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input type="text" placeholder="Zipcode" className="w-full border-gray-200" />
                <Input type="text" placeholder="Country" className="w-full border-gray-200" />
              </div>
              <Input type="tel" placeholder="Phone" className="w-full border-gray-200" />
            </form>
          </div>

          <div className="space-y-8">
            <h2 className="text-xl font-medium">
              <span className="text-gray-600">TOTAL</span>{" "}
              <span className="text-gray-900">{formatPrice(Number.parseFloat(total))}</span>
            </h2>

            <div className="space-y-6">
              <h2 className="text-xl font-medium">
                <span className="text-gray-600">PAYMENT</span> <span className="text-gray-900">METHOD</span>
              </h2>

              <RadioGroup defaultValue="razorpay" onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-4 border rounded-lg p-4">
                  <RadioGroupItem value="stripe" id="stripe" />
                  <Label htmlFor="stripe">
                    <Image src="/images/credit-card.png" alt="Stripe" width={80} height={30} />
                  </Label>
                </div>

                <div className="flex items-center space-x-4 border rounded-lg p-4">
                  <RadioGroupItem value="razorpay" id="razorpay" />
                  <Label htmlFor="razorpay">
                    <Image src="/images/razorpay.png" alt="Razorpay" width={80} height={30} />
                  </Label>
                </div>

                <div className="flex items-center space-x-4 border rounded-lg p-4">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">CASH ON DELIVERY</Label>
                </div>
              </RadioGroup>
            </div>

            <Button className="w-full bg-black text-white hover:bg-gray-900" onClick={handleCheckout}>
              PLACE ORDER
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
