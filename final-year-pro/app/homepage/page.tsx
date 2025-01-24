import React from "react"
import { Search, ShoppingCart, User, Heart, Filter, Shield } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GiftFinderQuiz } from "@/components/ui/GiftFinderQuiz"

export default function AmbikaNoveltySite() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/homepage" passHref>
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
            <Link href="/wishlist" passHref>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>
            </Link>
            <Link href="/admin" passHref>
              <Button variant="ghost" size="icon">
                <Shield className="h-5 w-5 text-red-600" />
                <span className="sr-only">Admin Page</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <nav className="bg-gray-100">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Stationery</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">Featured Products</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Check out our latest stationery items!
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="#">Notebooks</NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="#">Pens & Pencils</NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="#">Organizers</NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Gifts</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {["Birthday", "Anniversary", "Corporate", "Seasonal"].map((item) => (
                      <li key={item}>
                        <NavigationMenuLink href="#">{item}</NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Office Stationery</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Packing Supplies</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Craft Materials</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Gender</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Kids - Boy</DropdownMenuItem>
              <DropdownMenuItem>Kids - Girl</DropdownMenuItem>
              <DropdownMenuItem>Adults - Men</DropdownMenuItem>
              <DropdownMenuItem>Adults - Women</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">Latest Arrivals</h2>
          <div className="text-center mt-8">
            <Link href="/products" passHref>
              <button className="bg-black text-white px-7 py-2 font-semibold hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Shop Now
              </button>
            </Link>
          </div>
          <p className="text-center text-gray-600 mb-8">Discover our newest stationery and gift items!</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { id: 1, name: "Notebook", price: "₹50", image: "/images/notebook.jpg" },
              { id: 2, name: "Messi keychain", price: "₹199", image: "/images/model.jpg" },
              { id: 3, name: "Barbie kit", price: "₹700", image: "/images/barbie.jpg" },
              { id: 4, name: "Stationery Kit", price: "₹149", image: "/images/kit.jpg" },
            ].map((product) => (
              <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Special Offers Banner */}
        <section className="mb-12 bg-gradient-to-r from-pink-500 to-red-500 text-white py-8 rounded-lg">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Special Offers!</h2>
            <p className="text-xl mb-6">Get up to 50% off on selected items</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/20 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Buy 2 Get 1 Free</h3>
                <p>On all notebooks</p>
              </div>
              <div className="bg-white/20 p-4 rounded-lg">
                <h3 className="font-bold mb-2">20% Student Discount</h3>
                <p>With valid ID</p>
              </div>
              <div className="bg-white/20 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Free Shipping</h3>
                <p>On orders above ₹999</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Trending Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { id: 5, name: "Premium Diary", price: "₹299", image: "/placeholder.svg?height=200&width=200" },
              { id: 6, name: "Art Set", price: "₹599", image: "/placeholder.svg?height=200&width=200" },
              { id: 7, name: "Gift Hamper", price: "₹999", image: "/placeholder.svg?height=200&width=200" },
              { id: 8, name: "School Bundle", price: "₹799", image: "/placeholder.svg?height=200&width=200" },
            ].map((product) => (
              <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Banner */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-lg overflow-hidden group">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="School Supplies"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">School Supplies</h3>
                  <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200">Shop Now</button>
                </div>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden group">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Office Essentials"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Office Essentials</h3>
                  <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200">Shop Now</button>
                </div>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden group">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Gift Items"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Gift Items</h3>
                  <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200">Shop Now</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Collection */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { id: 9, name: "Designer Notebook", price: "₹199", image: "/placeholder.svg?height=200&width=200" },
              { id: 10, name: "Birthday Pack", price: "₹499", image: "/placeholder.svg?height=200&width=200" },
              { id: 11, name: "Premium Pen Set", price: "₹899", image: "/placeholder.svg?height=200&width=200" },
              { id: 12, name: "Party Supplies", price: "₹1299", image: "/placeholder.svg?height=200&width=200" },
            ].map((product) => (
              <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">New</div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Limited Time Offer Banner */}
        <section className="mb-12 bg-yellow-100 p-8 rounded-lg">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Limited Time Offer!</h2>
                <p className="text-lg text-gray-600">Get an extra 10% off on your first purchase</p>
                <p className="text-sm text-gray-500 mt-2">Use code: WELCOME10</p>
              </div>
              <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transform hover:scale-105 transition-all duration-200">
                Shop Now
              </button>
            </div>
          </div>
        </section>
      </main>
      <GiftFinderQuiz />
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

