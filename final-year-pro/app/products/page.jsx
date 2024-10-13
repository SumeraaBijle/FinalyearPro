'use client'

import { useState } from 'react'
import Image from 'next/image'


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
  const [cart, setCart] = useState([])
  const [filters, setFilters] = useState([])
  const [sortOrder, setSortOrder] = useState('default')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const toggleFilter = (category) => {
    if (filters.includes(category)) {
      setFilters(filters.filter(f => f !== category))
    } else {
      setFilters([...filters, category])
    }
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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Our Products</h1>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="sr-only">Cart</span>
            <span aria-live="polite">{cart.length} items</span>
          </button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore Our Collection</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </h3>
              <div className="space-y-4">
                {categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={category}
                      checked={filters.includes(category)}
                      onChange={() => toggleFilter(category)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={category} className="text-sm font-medium text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </aside>
          <div className="flex-1">
            <div className="mb-4 flex justify-end relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 border rounded-md flex items-center gap-2"
              >
                Sort by
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button
                      onClick={() => {
                        setSortOrder('default')
                        setIsDropdownOpen(false)
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                    >
                      Default
                    </button>
                    <button
                      onClick={() => {
                        setSortOrder('priceLowToHigh')
                        setIsDropdownOpen(false)
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                    >
                      Price: Low to High
                    </button>
                    <button
                      onClick={() => {
                        setSortOrder('priceHighToLow')
                        setIsDropdownOpen(false)
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                    >
                      Price: High to Low
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-2xl font-bold mt-2">{formatPrice(product.price)}</p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}