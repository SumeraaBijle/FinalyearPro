import React from 'react'
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

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold mb-2">Easy Exchange Policy</h3>
              <p className="text-sm">Hassle-free exchanges within 30 days</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">7 Days Return Policy</h3>
              <p className="text-sm">Full refunds for unopened items</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Best Customer Support</h3>
              <p className="text-sm">Available 24/7 to assist you</p>
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
      </footer>
    </div>
  )
}