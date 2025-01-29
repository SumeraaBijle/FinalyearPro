"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import Header from "../head/foot/Header"
import Footer from "../head/foot/Footer"

export default function AdminDashboard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showAddProduct, setShowAddProduct] = useState(true)
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    image: null,
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Hardcoded products data
  const [products] = useState([
    {
      _id: "1",
      name: "Sample Product 1",
      category: "Electronics",
      price: "999",
      quantity: "10",
      image: "/placeholder.svg",
    },
    {
      _id: "2",
      name: "Sample Product 2",
      category: "Clothing",
      price: "499",
      quantity: "20",
      image: "/placeholder.svg",
    },
  ])

  // State for users from MongoDB
  const [users, setUsers] = useState([])

  // Hardcoded orders and stocks
  const [orders] = useState([
    { id: 101, user: "John Doe", status: "Pending" },
    { id: 102, user: "Jane Smith", status: "Delivered" },
  ])

  const [stocks] = useState([
    { id: "S1", product: "Laptop", quantity: 10 },
    { id: "S2", product: "Phone", quantity: 15 },
  ])

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers()
    }
  }, [isLoggedIn])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users")
      const data = await response.json()
      if (data.users) {
        setUsers(data.users)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === "admin@gmail.com" && password === "admin") {
      setIsLoggedIn(true)
      setError("")
    } else {
      setError("Invalid credentials")
    }
  }

  const handleImageChange = (file) => {
    if (file) {
      setProductData({ ...productData, image: file })
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  const handleSubmitProduct = async (e) => {
    e.preventDefault()
    // Just show an alert for now since we're not handling product submission
    alert("Product form submission is currently disabled")
  }

  const handleLogout = () => {
    setIsLoggingOut(true)
    // Simulate a logout process
    setTimeout(() => {
      setIsLoggedIn(false)
      setIsLoggingOut(false)
      setEmail("")
      setPassword("")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm bg-red-50 p-3 rounded-md border border-red-200">{error}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Ambika Novelty</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowAddProduct(!showAddProduct)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  {showAddProduct ? "View Product List" : "Add Product"}
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-300 disabled:opacity-50"
                >
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>

            {/* Users Section - Fetched from MongoDB */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Users</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4">#{user.id.substring(user.id.length - 6)}</td>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{new Date(user.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Orders Section - Hardcoded */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Orders</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4">{order.id}</td>
                        <td className="px-6 py-4">{order.user}</td>
                        <td className="px-6 py-4">{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stock Section - Hardcoded */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Stock</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {stocks.map((stock) => (
                      <tr key={stock.id}>
                        <td className="px-6 py-4">{stock.id}</td>
                        <td className="px-6 py-4">{stock.product}</td>
                        <td className="px-6 py-4">{stock.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {showAddProduct ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-6">Add New Product</h2>
                <form onSubmit={handleSubmitProduct} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                      <input
                        type="text"
                        value={productData.name}
                        onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                        placeholder="Enter product name"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={productData.description}
                        onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                        placeholder="Enter product description"
                        className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                      <input
                        type="number"
                        value={productData.price}
                        onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                        placeholder="0.00"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                      <input
                        type="number"
                        value={productData.quantity}
                        onChange={(e) => setProductData({ ...productData, quantity: e.target.value })}
                        placeholder="Enter quantity"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input
                        type="text"
                        value={productData.category}
                        onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                        placeholder="Enter category"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e.target.files[0])}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        {imagePreview ? (
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="max-h-40 object-contain"
                          />
                        ) : (
                          <div className="text-center">
                            <Plus className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-1 text-sm text-gray-500">Upload image</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-300"
                  >
                    Add Product
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-6">Products List</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product._id}>
                          <td className="px-6 py-4">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-16 w-16 object-cover rounded"
                            />
                          </td>
                          <td className="px-6 py-4">{product.name}</td>
                          <td className="px-6 py-4">{product.category}</td>
                          <td className="px-6 py-4">₹{product.price}</td>
                          <td className="px-6 py-4">{product.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

