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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
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

      <nav className="relative bg-white border-b border-gray-200 shadow-sm">
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(to right, #000 1px, transparent 1px)`,
               backgroundSize: '20px 20px'
             }}>
        </div>
        <div className="container mx-auto px-4 py-3 relative">
          <div className="flex items-center justify-between">
            <NavigationMenu className="animate-in">
              <NavigationMenuList className="flex gap-6">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-purple-100 text-purple-600 group">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Stationery
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white rounded-xl shadow-lg border border-purple-700 ">
                    <div className="grid grid-cols-2 gap-4 p-6 w-[500px]">
                      <div className="col-span-2">
                        <div className="relative overflow-hidden rounded-lg">
                          <img 
                            src="https://images.unsplash.com/photo-1456735190827-d1262f71b8a3" 
                            alt="Featured Stationery"
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                            <h3 className="text-white text-xl font-bold">New Arrivals</h3>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-gray-700">Categories</h4>
                        <ul className="space-y-2">
                          <li>
                            <NavigationMenuLink href="#" className="text-gray-600 hover:text-pink-500 flex items-center gap-2">
                              <span>Premium Notebooks</span>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink href="#" className="text-gray-600 hover:text-pink-500 flex items-center gap-2">
                              <span>Writing Instruments</span>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink href="#" className="text-gray-600 hover:text-pink-500 flex items-center gap-2">
                              <span>Art Supplies</span>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-gray-700">Collections</h4>
                        <ul className="space-y-2">
                          <li>
                            <NavigationMenuLink href="#" className="text-gray-600 hover:text-pink-500 flex items-center gap-2">
                              <span>Student Essentials</span>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink href="#" className="text-gray-600 hover:text-pink-500 flex items-center gap-2">
                              <span>Professional Series</span>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink href="#" className="text-gray-600 hover:text-pink-500 flex items-center gap-2">
                              <span>Limited Editions</span>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-purple-100 text-purple-600 group">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6M12 2v8m0 0l4-4m-4 4L8 6" />
                      </svg>
                      Gifts
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white rounded-xl shadow-lg border border-gray-200">
                    <div className="grid grid-cols-3 gap-4 p-6 w-[600px]">
                      {[
                        { name: "Birthday", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-4.0.3" },
                        { name: "Anniversary", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3" },
                        { name: "Corporate", image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?ixlib=rb-4.0.3" }
                      ].map((category) => (
                        <div key={category.name} className="group relative overflow-hidden rounded-lg">
                          <img src={category.image} alt={category.name} className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                            <span className="text-white font-medium">{category.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className="text-purple-600 hover:text-pink-500 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Office Stationery
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className="text-purple-600 hover:text-pink-500 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                    Packing Supplies
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className="text-purple-600 hover:text-pink-500 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Craft Materials
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white hover:bg-gray-100 text-gray-700">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white rounded-xl shadow-lg border border-gray-200">
                <DropdownMenuLabel className="text-gray-700">Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-gray-100">
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Kids - Boy
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-100">
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Kids - Girl
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-100">
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Adults - Men
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-100">
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Adults - Women
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Latest Arrivals
            </span>
          </h2>
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
              { 
                id: 1, 
                name: "Premium Notebook", 
                price: "₹50", 
                image: "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?ixlib=rb-4.0.3",
                description: "High-quality paper, hardbound cover"
              },
              { 
                id: 2, 
                name: "Messi Keychain", 
                price: "₹199", 
                image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3",
                description: "Official licensed merchandise"
              },
              { 
                id: 3, 
                name: "Barbie Stationery Kit", 
                price: "₹700", 
                image: "https://images.unsplash.com/photo-1628359355624-855775b5c9c8?ixlib=rb-4.0.3",
                description: "Complete set with pencils and accessories"
              },
              { 
                id: 4, 
                name: "Premium Stationery Kit", 
                price: "₹149", 
                image: "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?ixlib=rb-4.0.3",
                description: "Essential school supplies bundle"
              },
            ].map((product) => (
              <div 
                key={product.id} 
                className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 right-0 m-2">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-pink-600">{product.price}</p>
                    <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Special Offers Banner */}
        <section className="mb-12 bg-gradient-to-r from-violet-500 to-pink-500 text-white py-8 rounded-xl shadow-lg">
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
          <h2 className="text-4xl font-bold text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500">
              Trending Now
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { 
                id: 5, 
                name: "Premium Diary", 
                price: "₹299", 
                image: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3",
                description: "Leather-bound premium diary"
              },
              { 
                id: 6, 
                name: "Professional Art Set", 
                price: "₹599", 
                image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3",
                description: "Complete art supplies kit"
              },
              { 
                id: 7, 
                name: "Luxury Gift Hamper", 
                price: "₹999", 
                image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3",
                description: "Curated premium gift collection"
              },
              { 
                id: 8, 
                name: "School Essentials Bundle", 
                price: "₹799", 
                image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3",
                description: "Complete school supplies set"
              },
            ].map((product) => (
              <div 
                key={product.id} 
                className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 right-0 m-2">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-pink-600">{product.price}</p>
                    <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Banner */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500">
              Shop by Category
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6"
                alt="School Supplies"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex items-center justify-center group-hover:bg-black/60 transition-colors">
                <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-bold mb-2">School Supplies</h3>
                  <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc"
                alt="Office Essentials"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex items-center justify-center group-hover:bg-black/60 transition-colors">
                <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-bold mb-2">Office Essentials</h3>
                  <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48"
                alt="Gift Items"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex items-center justify-center group-hover:bg-black/60 transition-colors">
                <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-bold mb-2">Gift Items</h3>
                  <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
                    Shop Now
                  </button>
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

