"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiShoppingBag, FiSettings, FiLogOut, FiEdit2, FiBell, FiPhone, FiMapPin, FiXCircle } from "react-icons/fi";
import Header from "@/app/head/foot/Header";
import Footer from "@/app/head/foot/Footer";
import styles from "../../../styles/UserDashboard.module.css";
import Link from "next/link";

export default function UserDashboard() {
  const { data: session, status, update } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [updateStatus, setUpdateStatus] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (session?.user) {
      setProfileData({
        name: session.user.name || "",
        phone: session.user.phone || "",
        address: session.user.address || "",
      });
    }
  }, [session]);

  useEffect(() => {
    if (activeTab === "orders" && session?.user?.email) {
      fetchOrders();
    }
  }, [activeTab, session]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/orders?email=${session.user.email}`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Failed to fetch orders: " + error.message);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        console.log("Cancelling order:", orderId);
        const response = await fetch(`/api/orders?id=${orderId}`, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to cancel order");
        }
  
        alert("Order cancelled successfully");
        fetchOrders();
      } catch (error) {
        console.error("Error cancelling order:", error);
        alert("Failed to cancel order: " + error.message);
      }
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/" });
  };

  const handleProfileUpdate = async () => {
    try {
      setUpdateStatus("");

      if (!profileData.phone || !profileData.address) {
        setUpdateStatus("Phone number and address are required");
        return;
      }

      const response = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          phone: profileData.phone,
          address: profileData.address,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setUpdateStatus("Profile updated successfully");
        setIsEditing(false);

        await update({
          ...session,
          user: {
            ...session?.user,
            phone: profileData.phone,
            address: profileData.address,
          },
        });
      } else {
        setUpdateStatus(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setUpdateStatus("Error connecting to server. Please try again.");
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <FiUser /> },
    { id: "orders", label: "Order History", icon: <FiShoppingBag /> },
    { id: "settings", label: "Settings", icon: <FiSettings /> },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-violet-100 relative">
      {/* Enhanced background blur elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-20 -left-40 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-40 right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
      </div>

      <Header />
      <main className="container mx-auto px-4 py-8 relative">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center py-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600">
            Your Dashboard
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Manage your profile, view orders, and update your preferences
          </p>
        </motion.section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-xl overflow-hidden mb-16"
        >
          <div className="flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <motion.div className="md:w-64 bg-gradient-to-b from-violet-600/90 via-purple-600/90 to-pink-600/90 text-white p-6">
              <motion.div 
                initial={{ scale: 0.9 }} 
                animate={{ scale: 1 }} 
                className="flex flex-col items-center mb-8"
              >
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                    <img 
                      src={session?.user?.image || "/default-avatar.png"} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity rounded-full" 
                      whileHover={{ opacity: 1 }}
                    >
                      <FiEdit2 size={24} />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-400 border-2 border-white" />
                </div>
                <h3 className="text-xl font-semibold">{session?.user?.name}</h3>
                <p className="text-white/80 text-sm">{session?.user?.email}</p>
                <div className="flex gap-6 mt-4">
                  <div className="text-center">
                    <span className="block text-2xl font-bold">{orders.length}</span>
                    <span className="text-xs text-white/80">Orders</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-2xl font-bold">0</span>
                    <span className="text-xs text-white/80">Reviews</span>
                  </div>
                </div>
              </motion.div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeTab === tab.id 
                        ? "bg-white/20 font-semibold" 
                        : "hover:bg-white/10"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </motion.button>
                ))}
                <motion.button
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 transition-colors mt-6"
                  onClick={handleSignOut}
                  disabled={isLoading}
                >
                  <FiLogOut />
                  <span>{isLoading ? "Signing out..." : "Sign Out"}</span>
                </motion.button>
              </nav>
            </motion.div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab} 
                className="flex-1 p-8"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "profile" && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-pink-600">
                        Profile Information
                      </h2>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-violet-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-shadow"
                        onClick={() => (isEditing ? handleProfileUpdate() : setIsEditing(true))}
                      >
                        <FiEdit2 className="inline mr-2" /> {isEditing ? "Save Changes" : "Edit Profile"}
                      </motion.button>
                    </div>
                    
                    {updateStatus && (
                      <div
                        className={`mb-6 p-4 rounded-xl ${
                          updateStatus.includes("Error") 
                            ? "bg-red-100/80 text-red-700" 
                            : "bg-green-100/80 text-green-700"
                        }`}
                      >
                        {updateStatus}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div 
                        className="backdrop-blur-xl bg-white/50 rounded-2xl p-6 shadow-md"
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Personal Details</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                            {isEditing ? (
                              <input
                                type="text"
                                value={profileData.name}
                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            ) : (
                              <p className="text-gray-800">{profileData.name}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                            <p className="text-gray-800">{session?.user?.email}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              <FiPhone className="inline mr-1" /> Phone Number
                            </label>
                            {isEditing ? (
                              <input
                                type="tel"
                                value={profileData.phone}
                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your phone number"
                              />
                            ) : (
                              <p className="text-gray-800">{profileData.phone || "Not provided"}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              <FiMapPin className="inline mr-1" /> Address
                            </label>
                            {isEditing ? (
                              <textarea
                                value={profileData.address}
                                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your address"
                                rows={3}
                              />
                            ) : (
                              <p className="text-gray-800">{profileData.address || "Not provided"}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="backdrop-blur-xl bg-white/50 rounded-2xl p-6 shadow-md"
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Account Statistics</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 p-4 rounded-xl">
                            <FiShoppingBag className="text-purple-600 text-xl mb-2" />
                            <div>
                              <span className="block text-2xl font-bold text-gray-800">{orders.length}</span>
                              <span className="text-sm text-gray-600">Total Orders</span>
                            </div>
                          </div>
                          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-xl">
                            <FiBell className="text-pink-600 text-xl mb-2" />
                            <div>
                              <span className="block text-2xl font-bold text-gray-800">Active</span>
                              <span className="text-sm text-gray-600">Notification Status</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-pink-600 mb-6">
                      Order History
                    </h2>
                    
                    {orders.length === 0 ? (
                      <motion.div 
                        className="text-center py-16 bg-white/50 backdrop-blur-xl rounded-2xl shadow-md"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                      >
                        <FiShoppingBag size={64} className="mx-auto text-purple-400 mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Orders Yet</h3>
                        <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                        <Link href="/products">
                          <motion.button
                            className="bg-gradient-to-r from-violet-600 to-pink-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:shadow-lg transition-shadow"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Explore Collection
                          </motion.button>
                        </Link>
                      </motion.div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {orders.map((order) => (
                          <motion.div 
                            key={order._id} 
                            className="backdrop-blur-xl bg-white/50 rounded-2xl p-6 shadow-md"
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-semibold">Order #{order._id.substring(order._id.length - 6)}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                order.status === "Cancelled" 
                                  ? "bg-red-100 text-red-700" 
                                  : "bg-green-100 text-green-700"
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="space-y-2 mb-4">
                              <p><span className="text-gray-600">Total:</span> <span className="font-medium">₹{order.totalAmount}</span></p>
                              <p><span className="text-gray-600">Payment Method:</span> <span className="font-medium">{order.paymentMethod}</span></p>
                              <p><span className="text-gray-600">Date:</span> <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span></p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 mb-4">
                              <h4 className="font-medium mb-2">Products:</h4>
                              <div className="space-y-1">
                                {order.products.map((product) => (
                                  <div key={product.productId} className="text-sm">
                                    {product.name} <span className="text-gray-600">(Qty: {product.quantity})</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {order.status !== "Cancelled" && (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors px-4 py-2 rounded-xl flex items-center justify-center gap-2"
                                onClick={() => handleCancelOrder(order._id)}
                              >
                                <FiXCircle /> Cancel Order
                              </motion.button>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "settings" && (
                  <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-pink-600 mb-6">
                      Account Settings
                    </h2>
                    
                    <motion.div 
                      className="backdrop-blur-xl bg-white/50 rounded-2xl p-6 shadow-md"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">Notification Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between px-4 py-3 bg-white/70 rounded-xl">
                          <span className="font-medium">Email Notifications</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notifications}
                              onChange={() => setNotifications(!notifications)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-violet-600 peer-checked:to-pink-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between px-4 py-3 bg-white/70 rounded-xl">
                          <span className="font-medium">Order Updates</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={orderUpdates}
                              onChange={() => setOrderUpdates(!orderUpdates)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-violet-600 peer-checked:to-pink-600"></div>
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}