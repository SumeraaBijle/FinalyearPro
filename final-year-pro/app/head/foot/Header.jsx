"use client"
import { Search, ShoppingCart, User, Heart, Shield } from "lucide-react"
import Link from "next/link"
import { useCart } from "../../contexts/cartContext"

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

export default function Header() {
  const { cart } = useCart();
  
  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/20 shadow-lg">
  <div className="container mx-auto px-4 py-4 flex items-center justify-between">
    <Link href="/homepage" passHref>
      <img 
        src="/logo.png" 
        alt="Ambika Novelty" 
        className="h-20 cursor-pointer ml-[30px]"
      />
    </Link>

  <Link href="/homepage" passHref>
    <div className="flex-grow text-center">
  <h1 className="text-4xl font-bold text-purple-700">Ambika Gift and Novelty</h1>
    </div>
  </Link>


    <div className="flex items-center space-x-4">
      <div className="relative">
        <Link href="/cart">
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
      <Link href="/login" passHref>
        <Button variant="ghost" size="icon">
          <User className="h-6 w-6" />
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

      <nav className="relative backdrop-blur-xl bg-white/50 border-b border-white/20 shadow-md">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(to right, #000 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
        <div className="container mx-auto px-4 py-3 relative">
          <NavigationMenu className="animate-in">
            <NavigationMenuList className="flex gap-6">
              <NavigationMenuItem>
                
                <NavigationMenuContent className="bg-white rounded-xl shadow-lg border border-purple-700">
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
                          <NavigationMenuLink
                            href="#"
                            className="text-gray-600 hover:text-pink-500 flex items-center gap-2"
                          >
                            <span>Premium Notebooks</span>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink
                            href="#"
                            className="text-gray-600 hover:text-pink-500 flex items-center gap-2"
                          >
                            <span>Writing Instruments</span>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink
                            href="#"
                            className="text-gray-600 hover:text-pink-500 flex items-center gap-2"
                          >
                            <span>Art Supplies</span>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-gray-700">Collections</h4>
                      <ul className="space-y-2">
                        <li>
                          <NavigationMenuLink
                            href="#"
                            className="text-gray-600 hover:text-pink-500 flex items-center gap-2"
                          >
                            <span>Student Essentials</span>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink
                            href="#"
                            className="text-gray-600 hover:text-pink-500 flex items-center gap-2"
                          >
                            <span>Professional Series</span>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink
                            href="#"
                            className="text-gray-600 hover:text-pink-500 flex items-center gap-2"
                          >
                            <span>Limited Editions</span>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="text-purple-600 hover:text-pink-500 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  Office Stationery
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="text-purple-600 hover:text-pink-500 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    />
                  </svg>
                  Packing Supplies
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="text-purple-600 hover:text-pink-500 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Craft Materials
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </>
  )
}

