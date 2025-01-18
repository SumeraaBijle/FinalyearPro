'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, ShoppingCart, User, Heart, CheckCircle } from 'lucide-react'


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from '../contexts/cartContext'

const products = [
  { id: 1, name: 'Hotwheels', price: 1499, category: 'Boys', image: '/images/hotwheelsmain.jpg', images: [
    '/images/hotwheelsmain.jpg',
    '/images/view2.jpg',
    '/images/hwview3.jpg',
    '/images/hwview4.jpg',
    '/images/hotwheelsmain.jpg'
  ], description: 'The Hot Wheels 2019 Dino Riders series unleashes the thrill of prehistoric power with the speed and excitement of high-performance cars. This collection features dinosaur-themed vehicles, blending ferocious beastly designs with sleek Hot Wheels engineering.' },
  { id: 2, name: 'Barbie set', price: 2299, category: 'Girls', image: '/images/girls-dress.jpg', images: [
    '/images/girls-dress.jpg',
    '/images/girls-dress-2.jpg',
    '/images/girls-dress-3.jpg',
    '/images/girls-dress-4.jpg',
    '/images/girls-dress-5.jpg'
  ], description: 'Complete Barbie doll set with fashionable accessories.' },
  { id: 3, name: 'Desk Organizer', price: 1899, category: 'Office Gifting', image: '/images/desk-organizer.jpg', images: [
    '/images/desk-organizer.jpg',
    '/images/desk-organizer-2.jpg',
    '/images/desk-organizer-3.jpg',
    '/images/desk-organizer-4.jpg',
    '/images/desk-organizer-5.jpg'
  ], description: 'Organize your desk with style and efficiency.' },
  { id: 4, name: 'Notebook Set', price: 1199, category: 'Stationery', image: '/images/notebook-set.jpg', images: [
    '/images/notebook-set.jpg',
    '/images/notebook-set-2.jpg',
    '/images/notebook-set-3.jpg',
    '/images/notebook-set-4.jpg',
    '/images/notebook-set-5.jpg'
  ], description: 'Perfect for jotting down ideas and notes.' },
  { id: 5, name: 'Talking cactus', price: 2999, category: 'Boys', image: '/images/boys-sneakers.jpg', images: [
    '/images/boys-sneakers.jpg',
    '/images/boys-sneakers-2.jpg',
    '/images/boys-sneakers-3.jpg',
    '/images/boys-sneakers-4.jpg',
    '/images/boys-sneakers-5.jpg'
  ], description: 'A fun and quirky cactus that talks to you.' },
  { id: 6, name: 'Girls Backpack', price: 2699, category: 'Girls', image: '/images/girls-backpack.jpg', images: [
    '/images/girls-backpack.jpg',
    '/images/girls-backpack-2.jpg',
    '/images/girls-backpack-3.jpg',
    '/images/girls-backpack-4.jpg',
    '/images/girls-backpack-5.jpg'
  ], description: 'Carry your essentials in style with this girls backpack.' },
  { id: 7, name: 'Desk Lamp', price: 3799, category: 'Office Gifting', image: '/images/desk-lamp.jpg', images: [
    '/images/desk-lamp.jpg',
    '/images/desk-lamp-2.jpg',
    '/images/desk-lamp-3.jpg',
    '/images/desk-lamp-4.jpg',
    '/images/desk-lamp-5.jpg'
  ], description: 'Illuminate your workspace with this stylish desk lamp.' },
  { id: 8, name: 'Colored Pencils', price: 799, category: 'Stationery', image: '/images/colored-pencils.jpg', images: [
    '/images/colored-pencils.jpg',
    '/images/colored-pencils-2.jpg',
    '/images/colored-pencils-3.jpg',
    '/images/colored-pencils-4.jpg',
    '/images/colored-pencils-5.jpg'
  ], description: 'Color your world with these vibrant colored pencils.' },
]

const categories = ['Boys', 'Girls', 'Office Gifting', 'Stationery']

export default function ProductPage() {
  const [filters, setFilters] = useState([])
  const [sortOrder, setSortOrder] = useState('default')
  const [wishlist, setWishlist] = useState([])
  const { cart, addToCart } = useCart()
  const [popup, setPopup] = useState({ visible: false, message: '' })
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)

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

      {/* Product Description Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
              <button 
                onClick={() => {
                  setSelectedProduct(null)
                  setSelectedImage(0)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Image
                    src={selectedProduct.images[selectedImage]}
                    alt={`${selectedProduct.name} - View ${selectedImage + 1}`}
                    width={400}
                    height={400}
                    className="rounded-lg object-cover w-full h-[300px]"
                  />
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {selectedProduct.images.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-black' : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${selectedProduct.name} - Thumbnail ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-[60px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-600 mb-4 text-sm">{selectedProduct.description}</p>
                <p className="text-lg font-bold mb-4">{formatPrice(selectedProduct.price)}</p>
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                    setSelectedImage(0);
                  }}
                  className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/homepage" className="text-2xl font-bold text-gray-800 cursor-pointer">
          Ambika Novelty
        </a>
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

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div 
                onClick={() => setSelectedProduct(product)}
                className="cursor-pointer"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-base font-medium text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-500">{formatPrice(product.price)}</p>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-black text-white py-1.5 px-3 rounded text-sm hover:bg-gray-800"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      wishlist.includes(product.id) ? 'fill-current text-red-500' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
