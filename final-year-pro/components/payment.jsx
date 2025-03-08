"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "/app/contexts/cartContext"; // Adjust the path if necessary
import Header from "../app/head/foot/Header";
import Footer from "../app/head/foot/Footer";

export default function Payment() {
  const searchParams = useSearchParams();
  const { cart, clearCart } = useCart();
  const total = searchParams.get("total") || "0";
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  // Format price in INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(price);
  };

  // Load Razorpay SDK dynamically
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Send email invoice to the customer
  const sendEmailInvoice = async (orderDetails) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send email");
      }

      alert("Order placed successfully! An email invoice has been sent to your email address.");
    } catch (error) {
      console.error("Email Error:", error);
      alert(`Failed to send email: ${error.message}`);
    }
  };

  // Add this function after sendEmailInvoice
  const sendWhatsAppNotification = async (orderDetails) => {
    try {
      const response = await fetch("/api/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          orderDetails: {
            totalAmount: orderDetails.total,
            paymentMethod: orderDetails.paymentMethod,
            customer: {
              name: `${firstName} ${lastName}`,
              phone: phone
            }
          }
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send WhatsApp notification");
      }
    } catch (error) {
      console.error("WhatsApp Error:", error);
    }
  };

  // Create an order in the database
  const createOrder = async () => {
    const orderDetails = {
      customer: {
        name: `${firstName} ${lastName}`,
        email,
        address: `${street}, ${city}, ${state}, ${zipcode}, ${country}`,
        phone,
      },
      products: cart.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: total,
      paymentMethod,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      clearCart();
      router.push("/");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // Handle checkout based on the selected payment method
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
          handler: async function (response) {
            await createOrder();
            await Promise.all([
              sendEmailInvoice({ email, total, paymentMethod, cart }),
              sendWhatsAppNotification({ email, total, paymentMethod, cart })
            ]);
            clearCart();
            router.push("/");
          },
          prefill: {
            name: `${firstName} ${lastName}`,
            email,
            contact: phone,
          },
          theme: { color: "#3399cc" },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      } catch (error) {
        console.error("Payment Error:", error);
        alert("Something went wrong. Try again.");
      }
    } else if (paymentMethod === "cash") {
      // Handle Cash on Delivery
      try {
        await createOrder();
        await Promise.all([
          sendEmailInvoice({ email, total, paymentMethod, cart }),
          sendWhatsAppNotification({ total, paymentMethod })
        ]);
        clearCart();
        router.push("/");
      } catch (error) {
        console.error("Order Error:", error);
      }
    } else {
      alert("Please select a valid payment method.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use the imported Header component */}
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-xl font-medium">
              <span className="text-gray-600">DELIVERY</span> <span className="text-gray-900">INFORMATION</span>
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="First name"
                  className="w-full border-gray-200"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Last name"
                  className="w-full border-gray-200"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <Input
                type="email"
                placeholder="Email address"
                className="w-full border-gray-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Street"
                className="w-full border-gray-200"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="City"
                  className="w-full border-gray-200"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="State"
                  className="w-full border-gray-200"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Zipcode"
                  className="w-full border-gray-200"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Country"
                  className="w-full border-gray-200"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <Input
                type="tel"
                placeholder="Phone"
                className="w-full border-gray-200"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
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

      <Footer />
    </div>
  );
}