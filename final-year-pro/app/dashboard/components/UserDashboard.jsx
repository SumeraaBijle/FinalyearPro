"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiShoppingBag, FiSettings, FiLogOut, FiEdit2, FiBell, FiPhone, FiMapPin, FiXCircle } from "react-icons/fi";
import Header from "@/app/aboutus/Header";
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
  const [orders, setOrders] = useState([]); // Add state for orders

  useEffect(() => {
    if (session?.user) {
      setProfileData({
        name: session.user.name || "",
        phone: session.user.phone || "",
        address: session.user.address || "",
      });
    }
  }, [session]);

  // Fetch orders when the "orders" tab is active
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
        console.log("Cancelling order:", orderId); // Debugging
        const response = await fetch(`/api/orders?id=${orderId}`, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to cancel order");
        }
  
        alert("Order cancelled successfully");
        fetchOrders(); // Refresh the orders list
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

        // Update the session
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
    <>
      <Header />
      <div className={styles.container}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={styles.dashboard}>
          {/* Sidebar Navigation */}
          <motion.div className={styles.sidebar}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className={styles.userInfo}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatarContainer}>
                  <img src={session?.user?.image || "/default-avatar.png"} alt="Profile" className={styles.avatar} />
                  <motion.div className={styles.editOverlay} whileHover={{ opacity: 1 }} initial={{ opacity: 0 }}>
                    <FiEdit2 />
                  </motion.div>
                </div>
                <div className={styles.onlineStatus} />
              </div>
              <h3 className={styles.userName}>{session?.user?.name}</h3>
              <p className={styles.userEmail}>{session?.user?.email}</p>
              <div className={styles.userStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>{orders.length}</span>
                  <span className={styles.statLabel}>Orders</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>0</span>
                  <span className={styles.statLabel}>Reviews</span>
                </div>
              </div>
            </motion.div>

            <nav className={styles.nav}>
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${styles.navButton} ${activeTab === tab.id ? styles.active : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className={styles.navIcon}>{tab.icon}</span>
                  {tab.label}
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={styles.signOutButton}
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
            <motion.div key={activeTab} {...fadeInUp} className={styles.content}>
              {activeTab === "profile" && (
                <div className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h2>Profile Information</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={styles.editButton}
                      onClick={() => (isEditing ? handleProfileUpdate() : setIsEditing(true))}
                    >
                      <FiEdit2 /> {isEditing ? "Save Changes" : "Edit Profile"}
                    </motion.button>
                  </div>
                  {updateStatus && (
                    <div
                      className={`${styles.updateStatus} ${
                        updateStatus.includes("Error") ? styles.error : styles.success
                      }`}
                    >
                      {updateStatus}
                    </div>
                  )}
                  <div className={styles.profileGrid}>
                    <div className={styles.profileCard}>
                      <h3>Personal Details</h3>
                      <div className={styles.profileInfo}>
                        <div className={styles.infoField}>
                          <label>Name</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={profileData.name}
                              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                              className={styles.editInput}
                            />
                          ) : (
                            <span>{profileData.name}</span>
                          )}
                        </div>
                        <div className={styles.infoField}>
                          <label>Email</label>
                          <span>{session?.user?.email}</span>
                        </div>
                        <div className={styles.infoField}>
                          <label>
                            <FiPhone className={styles.fieldIcon} /> Phone Number
                          </label>
                          {isEditing ? (
                            <input
                              type="tel"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                              className={styles.editInput}
                              placeholder="Enter your phone number"
                            />
                          ) : (
                            <span>{profileData.phone || "Not provided"}</span>
                          )}
                        </div>
                        <div className={styles.infoField}>
                          <label>
                            <FiMapPin className={styles.fieldIcon} /> Address
                          </label>
                          {isEditing ? (
                            <textarea
                              value={profileData.address}
                              onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                              className={`${styles.editInput} ${styles.textArea}`}
                              placeholder="Enter your address"
                              rows={3}
                            />
                          ) : (
                            <span>{profileData.address || "Not provided"}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={styles.profileCard}>
                      <h3>Account Statistics</h3>
                      <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                          <FiShoppingBag className={styles.statIcon} />
                          <div className={styles.statInfo}>
                            <span className={styles.statValue}>{orders.length}</span>
                            <span className={styles.statLabel}>Total Orders</span>
                          </div>
                        </div>
                        <div className={styles.statCard}>
                          <FiBell className={styles.statIcon} />
                          <div className={styles.statInfo}>
                            <span className={styles.statValue}>Active</span>
                            <span className={styles.statLabel}>Notification Status</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h2>Order History</h2>
                  </div>
                  <div className={styles.ordersList}>
                    {orders.length === 0 ? (
                      <motion.div className={styles.emptyState} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <FiShoppingBag size={64} />
                        <h3>No Orders Yet</h3>
                        <p>Start shopping to see your orders here</p>
                        <Link href="/products">
                          <motion.button
                            className={styles.primaryButton}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Browse Products
                          </motion.button>
                        </Link>
                      </motion.div>
                    ) : (
                      <div className={styles.orderGrid}>
                        {orders.map((order) => (
                          <div key={order._id} className={styles.orderCard}>
                            <div className={styles.orderHeader}>
                              <h3>Order #{order._id.substring(order._id.length - 6)}</h3>
                              <span className={`${styles.orderStatus} ${order.status === "Cancelled" ? styles.cancelled : ""}`}>
                                {order.status}
                              </span>
                            </div>
                            <div className={styles.orderDetails}>
                              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className={styles.orderProducts}>
                              <h4>Products:</h4>
                              {order.products.map((product) => (
                                <div key={product.productId} className={styles.productItem}>
                                  <p>{product.name} (Qty: {product.quantity})</p>
                                </div>
                              ))}
                            </div>
                            {order.status !== "Cancelled" && (
                              <button
                                className={styles.cancelButton}
                                onClick={() => handleCancelOrder(order._id)}
                              >
                                <FiXCircle /> Cancel Order
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className={styles.section}>
                  <h2>Account Settings</h2>
                  <div className={styles.settingsGrid}>
                    <motion.div className={styles.settingsCard}>
                      <h3>Notification Preferences</h3>
                      <div className={styles.settingOptions}>
                        <div className={styles.settingOption}>
                          <label className={styles.toggleLabel}>
                            <span>Email Notifications</span>
                            <div className={styles.toggleWrapper}>
                              <input
                                type="checkbox"
                                checked={notifications}
                                onChange={() => setNotifications(!notifications)}
                                className={styles.toggleInput}
                              />
                              <span className={styles.toggleSlider}></span>
                            </div>
                          </label>
                        </div>
                        <div className={styles.settingOption}>
                          <label className={styles.toggleLabel}>
                            <span>Order Updates</span>
                            <div className={styles.toggleWrapper}>
                              <input
                                type="checkbox"
                                checked={orderUpdates}
                                onChange={() => setOrderUpdates(!orderUpdates)}
                                className={styles.toggleInput}
                              />
                              <span className={styles.toggleSlider}></span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}