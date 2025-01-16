import React, { JSX } from 'react'
import { Search, ShoppingCart, User, Heart, Filter } from 'lucide-react'
import AuthForm from '../login/AuthForm'
import Link from 'next/link';


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

export default function AmbikaNoveltySite() {
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
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
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
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Featured Products
                          </div>
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
          <p className="text-center text-gray-600 mb-8">Discover our newest stationery and gift items!</p>
          <Link href="/products"><Button className="block mx-auto">Shop Now</Button></Link>
        </section>

        {/* Add your product grid or other content here */}
      </main>

      <footer className="bg-white py-12 border-t border-gray-200">
      <div className="container mx-auto px-6">
        
      <section className="py-16 px-6 bg-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe now & get 20% off</h2>
          <p className="mb-6">Stay updated with our latest products and offers.</p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 border border-gray-400 rounded-l-md focus:outline-none "
            />
            <button className="bg-red-500 text-white p-2 rounded-r-md hover:bg-red-700">
              Subscribe
            </button>
          </div>
        </div>
      </section>
        {/* Footer Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-600">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-800">Ambika Novelty<span className="text-pink-500">.</span></h1>
            <p className="text-sm max-w-sm mt-3">
              some more info ....
            </p>
          </div>

          {/* Company Links */}
          <div className="flex flex-col md:flex-row gap-8 mb-6 md:mb-0">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">COMPANY</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">About us</a></li>
                <li><a href="#" className="hover:underline">Delivery</a></li>
                <li><a href="#" className="hover:underline">Privacy policy</a></li>
              </ul>
            </div>

            {/* Get In Touch */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">GET IN TOUCH</h4>
              <ul className="space-y-2">
                <li>+1-000-000-0000</li>
                <li>ambikanovelty@gmail.com</li>
                <li><a href="#" className="hover:underline">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-10 text-gray-500 text-sm">
          <p>Copyright 2024© ambikanovelty.com - All Rights Reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  )
}