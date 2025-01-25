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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-violet-100 relative">
      {/* Enhanced background blur elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-pulse"></div>
        <div className="absolute top-20 -left-40 w-[600px] h-[600px] bg-violet-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-pulse delay-300"></div>
        <div className="absolute bottom-40 right-40 w-[550px] h-[550px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-pulse delay-700"></div>
      </div>

      {/* Enhanced header with better glassmorphism */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/20 shadow-lg">
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

      {/* Enhanced navigation */}
      <nav className="relative backdrop-blur-xl bg-white/50 border-b border-white/20 shadow-md">
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

      <main className="container mx-auto px-4 py-8 relative">
        {/* Enhanced Latest Arrivals section */}
        <section className="mb-12">
          <h2 className="text-5xl font-bold text-center mb-4 animate-in">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600">
              Latest Arrivals
            </span>
          </h2>
          <p className="text-center text-gray-700 mb-8 text-lg">
            Discover our newest stationery and gift items!
          </p>

          {/* Enhanced Product cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { 
                id: 5, 
                name: "Premium Diary", 
                price: "₹299", 
                image: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3",
                description: "Leather-bound premium diary",
                badge: "New"
              },
              { 
                id: 6, 
                name: "Professional Art Set", 
                price: "₹599", 
                image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3",
                description: "Complete art supplies kit",
                badge: "Limited Edition"
              },
              { 
                id: 7, 
                name: "Luxury Gift Hamper", 
                price: "₹999", 
                image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3",
                description: "Curated premium gift collection",
                badge: "Bestseller"
              },
              { 
                id: 8, 
                name: "School Essentials Bundle", 
                price: "₹799", 
                image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3",
                description: "Complete school supplies set",
                badge: "Trending"
              },
            ].map((product) => (
              <div 
                key={product.id} 
                className="group backdrop-blur-xl bg-white/40 border border-white/30 shadow-lg rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/60"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="backdrop-blur-md bg-white/30 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                      {product.badge}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-pink-600">{product.price}</p>
                    <button className="backdrop-blur-md bg-black/80 hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-500 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Special Offers Banner */}
        <section className="mb-12 backdrop-blur-xl bg-gradient-to-r from-violet-500/80 via-purple-500/80 to-pink-500/80 text-white py-12 rounded-2xl shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
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

        {/* Enhanced Trending Products */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { 
                id: 1, 
                name: "Messi Sports Keychain", 
                price: "₹199", 
                image: "https://images.unsplash.com/photo-1597248881519-db089d3744a5?ixlib=rb-4.0.3",
                description: "Official licensed merchandise",
                badge: "New"
              },
              { 
                id: 2, 
                name: "Barbie Dream Collection", 
                price: "₹700", 
                image: "https://images.unsplash.com/photo-1595750773001-a414c5ed2307?ixlib=rb-4.0.3",
                description: "Complete set with pencils and accessories",
                badge: "Limited Edition"
              },
              { 
                id: 3, 
                name: "Spider-Man Stationery Set", 
                price: "₹499", 
                image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-4.0.3",
                description: "Marvel themed school supplies",
                badge: "Trending"
              },
              { 
                id: 4, 
                name: "Premium Diary", 
                price: "₹299", 
                image: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3",
                description: "Leather-bound premium diary",
                badge: "Bestseller"
              },
            ].map((product) => (
              <div 
                key={product.id} 
                className="group bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${product.badge === 'New' ? 'bg-gradient-to-r from-pink-500 to-violet-500' : ''}
                      ${product.badge === 'Bestseller' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : ''}
                      ${product.badge === 'Limited Edition' ? 'bg-gradient-to-r from-purple-500 to-indigo-500' : ''}
                      ${product.badge === 'Trending' ? 'bg-gradient-to-r from-red-500 to-pink-500' : ''}
                      text-white
                    `}>
                      {product.badge}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-pink-600">{product.price}</p>
                      <p className="text-xs text-gray-500">Inclusive of taxes</p>
                    </div>
                    <button className="bg-black hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-500 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4h1.5l1.8 8.7a2 2 0 002 1.3h8.4a2 2 0 002-1.3L20 4h-1.5l-1.8 8.7a.5.5 0 01-.5.3H7.7a.5.5 0 01-.5-.3L5.5 4z" />
                      </svg>
                      Free Delivery
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      4.5/5
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Categories Banner */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600">
              Shop by Category
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative h-80 rounded-2xl overflow-hidden group transform hover:scale-105 transition-transform duration-300 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6"
                alt="School Supplies"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-bold mb-2">School Supplies</h3>
                  <button className="backdrop-blur-md bg-white/80 text-black px-6 py-2 rounded-full hover:bg-white transform hover:scale-105 transition-all duration-300">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden group transform hover:scale-105 transition-transform duration-300 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc"
                alt="Office Essentials"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-bold mb-2">Office Essentials</h3>
                  <button className="backdrop-blur-md bg-white/80 text-black px-6 py-2 rounded-full hover:bg-white transform hover:scale-105 transition-all duration-300">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden group transform hover:scale-105 transition-transform duration-300 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48"
                alt="Gift Items"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-bold mb-2">Gift Items</h3>
                  <button className="backdrop-blur-md bg-white/80 text-black px-6 py-2 rounded-full hover:bg-white transform hover:scale-105 transition-all duration-300">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Featured Collection */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600">
              Featured Collection
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { 
                id: 9, 
                name: "Marvel Avengers Diary", 
                price: "₹399", 
                image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-4.0.3",
                description: "Limited Edition Superhero Collection"
              },
              { 
                id: 10, 
                name: "Birthday Surprise Box", 
                price: "₹799", 
                image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3",
                description: "Curated Gift Box with Premium Items"
              },
              { 
                id: 11, 
                name: "Parker Premium Set", 
                price: "₹1299", 
                image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?ixlib=rb-4.0.3",
                description: "Luxury Pen & Pencil Collection"
              },
              { 
                id: 12, 
                name: "Disney Princess Pack", 
                price: "₹899", 
                image: "https://images.unsplash.com/photo-1535572290543-960a8046f5af?ixlib=rb-4.0.3",
                description: "Complete School Stationery Set"
              },
            ].map((product) => (
              <div key={product.id} className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      New
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-pink-600">{product.price}</p>
                    <button className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-violet-600 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Limited Time Offer Banner */}
        <section className="mb-16 backdrop-blur-xl bg-gradient-to-r from-yellow-100/70 via-orange-100/70 to-pink-100/70 p-12 rounded-2xl border border-yellow-200/50 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
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
      <footer className="backdrop-blur-xl bg-gradient-to-r from-gray-100/90 via-gray-200/90 to-gray-300/90 py-16 border-t border-white/20 shadow-inner">
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

