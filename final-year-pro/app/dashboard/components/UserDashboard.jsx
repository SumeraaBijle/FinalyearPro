'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUser, FiShoppingBag, FiSettings, FiLogOut, FiEdit2, FiBell } from 'react-icons/fi'
import Header from '@/app/aboutus/Header'
import styles from '../../../styles/UserDashboard.module.css'
import Link from 'next/link'

export default function UserDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [orderUpdates, setOrderUpdates] = useState(true)

  const handleSignOut = async () => {
    setIsLoading(true)
    await signOut({ callbackUrl: '/' })
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FiUser /> },
    { id: 'orders', label: 'Order History', icon: <FiShoppingBag /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> },
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.dashboard}
        >
          {/* Enhanced Sidebar Navigation */}
          <motion.div className={styles.sidebar}>
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className={styles.userInfo}
            >
              <div className={styles.avatarWrapper}>
                <div className={styles.avatarContainer}>
                  <img 
                    src={user.image || '/default-avatar.png'} 
                    alt="Profile" 
                    className={styles.avatar}
                  />
                  <motion.div 
                    className={styles.editOverlay}
                    whileHover={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                  >
                    <FiEdit2 />
                  </motion.div>
                </div>
                <div className={styles.onlineStatus} />
              </div>
              <h3 className={styles.userName}>{user.name}</h3>
              <p className={styles.userEmail}>{user.email}</p>
              <div className={styles.userStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>0</span>
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
                  className={`${styles.navButton} ${activeTab === tab.id ? styles.active : ''}`}
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
                <span>{isLoading ? 'Signing out...' : 'Sign Out'}</span>
              </motion.button>
            </nav>
          </motion.div>

          {/* Enhanced Content Area */}
          <AnimatePresence mode='wait'>
            <motion.div 
              key={activeTab}
              {...fadeInUp}
              className={styles.content}
            >
              {activeTab === 'profile' && (
                <div className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h2>Profile Information</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={styles.editButton}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <FiEdit2 /> {isEditing ? 'Save' : 'Edit Profile'}
                    </motion.button>
                  </div>
                  <div className={styles.profileGrid}>
                    <div className={styles.profileCard}>
                      <h3>Personal Details</h3>
                      <div className={styles.profileInfo}>
                        <div className={styles.infoField}>
                          <label>Name</label>
                          {isEditing ? (
                            <input type="text" defaultValue={user.name} className={styles.editInput} />
                          ) : (
                            <span>{user.name}</span>
                          )}
                        </div>
                        <div className={styles.infoField}>
                          <label>Email</label>
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.profileCard}>
                      <h3>Account Statistics</h3>
                      <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                          <FiShoppingBag className={styles.statIcon} />
                          <div className={styles.statInfo}>
                            <span className={styles.statValue}>0</span>
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

              {activeTab === 'orders' && (
                <div className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h2>Order History</h2>
                    <div className={styles.orderFilters}>
                      <select className={styles.filterSelect}>
                        <option>All Orders</option>
                        <option>Recent Orders</option>
                        <option>Past Orders</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.ordersList}>
                    <motion.div 
                      className={styles.emptyState}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
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
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
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
  )
}