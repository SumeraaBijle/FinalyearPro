'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2, Plus } from 'lucide-react'
import Header from '../head/foot/Header' // Adjust the path as needed
import Footer from '../head/foot/Footer' // Adjust the path as needed

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [products, setProducts] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    images: Array(5).fill(null),
  })
  const [imagePreview, setImagePreview] = useState(Array(5).fill(null))

  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts()
    }
  }, [isLoggedIn])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      if (data.success) {
        setProducts(data.products)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === 'admin@gmail.com' && password === 'admin') {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('Invalid credentials')
    }
  }

  const handleImageChange = (index, file) => {
    if (file) {
      const newImages = [...productData.images]
      newImages[index] = file
      setProductData({ ...productData, images: newImages })

      const previewUrl = URL.createObjectURL(file)
      const newPreviews = [...imagePreview]
      newPreviews[index] = previewUrl
      setImagePreview(newPreviews)
    }
  }

  const resetForm = () => {
    setProductData({
      name: '',
      description: '',
      price: '',
      quantity: '',
      images: Array(5).fill(null),
    })
    setImagePreview(Array(5).fill(null))
    setIsEditing(false)
  }

  const handleSubmitProduct = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', productData.name)
      formData.append('description', productData.description)
      formData.append('price', productData.price)
      formData.append('quantity', productData.quantity)

      productData.images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index}`, image)
        }
      })

      const url = isEditing 
        ? `/api/products/${productData._id}`
        : '/api/products'

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        body: formData,
      })

      if (response.ok) {
        alert(isEditing ? 'Product updated successfully!' : 'Product added successfully!')
        resetForm()
        fetchProducts()
      }
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const handleEdit = (product) => {
    setProductData({
      ...product,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
    })
    setImagePreview(product.images.concat(Array(5 - product.images.length).fill(null)))
    setIsEditing(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          alert('Product deleted successfully!')
          fetchProducts()
        }
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setEmail('')
    setPassword('')
    resetForm()
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 bg-gray-50">
        {!isLoggedIn ? (
          <div className="w-full max-w-md">
            {/* Login Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Login</h1>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@gmail.com"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm bg-red-50 p-3 rounded-md border border-red-200">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition-all transform hover:scale-[1.02]"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-7xl space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold mb-6">
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </h2>
              {/* Product Form */}
              <form onSubmit={handleSubmitProduct} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={productData.name}
                      onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                      placeholder="Enter product name"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                      Price (₹)
                    </label>
                    <input
                      id="price"
                      type="number"
                      value={productData.price}
                      onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                      placeholder="0.00"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      value={productData.quantity}
                      onChange={(e) => setProductData({ ...productData, quantity: e.target.value })}
                      placeholder="0"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Description
                  </label>
                  <textarea
                    id="description"
                    value={productData.description}
                    onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                    placeholder="Enter product description"
                    className="w-full p-3 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Product Images</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {productData.images.map((_, index) => (
                      <div key={index} className="space-y-2">
                        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-all">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(index, e.target.files[0])}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          {imagePreview[index] ? (
                            <img
                              src={imagePreview[index]}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <div className="text-center py-8">
                              <Plus className="mx-auto h-8 w-8 text-gray-400" />
                              <p className="mt-2 text-xs text-gray-500">Upload image {index + 1}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 text-white p-4 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-300 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="h-5 w-5" />
                    <span>{isEditing ? 'Update Product' : 'Add Product'}</span>
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-500 text-white px-6 py-4 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Products List */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold mb-6">Products List</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">₹{product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Pencil className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
