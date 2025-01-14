'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, ShoppingCart, User, Heart, CheckCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from '../contexts/cartContext'

const products = [
  { id: 1, name: 'Hotwheels', price: 1499, category: 'Boys', image: '/images/boys-tshirt.jpg' },
  { id: 2, name: 'Barbie set', price: 2299, category: 'Girls', image: '/images/girls-dress.jpg' },
  { id: 3, name: 'Desk Organizer', price: 1899, category: 'Office Gifting', image: '/images/desk-organizer.jpg' },
  { id: 4, name: 'Notebook Set', price: 1199, category: 'Stationery', image: '/images/notebook-set.jpg' },
  { id: 5, name: 'Talking cactus', price: 2999, category: 'Boys', image: '/images/boys-sneakers.jpg' },
  { id: 6, name: 'Girls Backpack', price: 2699, category: 'Girls', image: '/images/girls-backpack.jpg' },
  { id: 7, name: 'Desk Lamp', price: 3799, category: 'Office Gifting', image: '/images/desk-lamp.jpg' },
  { id: 8, name: 'Colored Pencils', price: 799, category: 'Stationery', image: '/images/colored-pencils.jpg' },
]

const categories = ['Boys', 'Girls', 'Office Gifting', 'Stationery']

export default function ProductPage() {
  const [filters, setFilters] = useState([])
  const [sortOrder, setSortOrder] = useState('default')
  const [wishlist, setWishlist] = useState([])
  const { cart, addToCart } = useCart()
  const [popup, setPopup] = useState({ visible: false, message: '' })

  const handleFilterChange = (category) => {
    if (category === 'All') {
      setFilters([])
    } else {
      setFilters([category])
    }
  }

  const toggleWishlist = (product) => {
    if (wishlist.includes(product.id)) {
      setWishlist(wishlist.filter(id => id !== product.id))
      showPopup('Item removed from your wishlist.')
    } else {
      setWishlist([...wishlist, product.id])
      showPopup('Item added to your wishlist.')
    }
  }

  const showPopup = (message) => {
    setPopup({ visible: true, message })
    setTimeout(() => setPopup({ visible: false, message: '' }), 3000)
  }

  const filteredProducts = products.filter(product =>
    filters.length === 0 || filters.includes(product.category)
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'priceLowToHigh') return a.price - b.price
    if (sortOrder === 'priceHighToLow') return b.price - a.price
    return 0
  })

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Popup Notification */}
      {popup.visible && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 z-50">
          <CheckCircle className="h-5 w-5" />
          <span>{popup.message}</span>
        </div>
      )}

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
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          {/* Filter Dropdown */}
          <select
            value={filters[0] || 'All'}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="All">Filter By</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="default">Sort By</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">{formatPrice(product.price)}</p>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Heart
                      className={`h-6 w-6 ${
                        wishlist.includes(product.id) ? 'fill-current text-red-500' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
