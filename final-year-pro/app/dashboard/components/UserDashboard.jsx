'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import { FiUser, FiShoppingBag, FiSettings, FiLogOut } from 'react-icons/fi'
import Header from '@/app/aboutus/Header'
import styles from '../../../styles/UserDashboard.module.css'


export default function UserDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    await signOut({ callbackUrl: '/' })
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FiUser /> },
    { id: 'orders', label: 'Order History', icon: <FiShoppingBag /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> },
  ]

  return (
    <>
      <Header />
      <div className={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.dashboard}
        >
          {/* Sidebar Navigation */}
          <div className={styles.sidebar}>
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className={styles.userInfo}
            >
              <div className={styles.avatarContainer}>
                <img 
                  src={user.image || '/default-avatar.png'} 
                  alt="Profile" 
                  className={styles.avatar}
                />
                <div className={styles.onlineStatus} />
              </div>
              <h3 className={styles.userName}>{user.name}</h3>
              <p className={styles.userEmail}>{user.email}</p>
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
          </div>

          {/* Main Content Area */}
          <motion.div 
            className={styles.content}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {activeTab === 'profile' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={styles.section}
              >
                <h2>Profile Information</h2>
                <div className={styles.profileInfo}>
                  <div className={styles.infoCard}>
                    <label>Name</label>
                    <span>{user.name}</span>
                  </div>
                  <div className={styles.infoCard}>
                    <label>Email</label>
                    <span>{user.email}</span>
                  </div>
                  <div className={styles.infoCard}>
                    <label>Member Since</label>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={styles.section}
              >
                <h2>Order History</h2>
                <div className={styles.ordersList}>
                  <div className={styles.emptyState}>
                    <FiShoppingBag size={48} />
                    <p>No orders found</p>
                    <button className={styles.primaryButton}>Start Shopping</button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={styles.section}
              >
                <h2>Account Settings</h2>
                <div className={styles.settingsForm}>
                  <div className={styles.settingsCard}>
                    <h3>Notification Preferences</h3>
                    <div className={styles.settingOption}>
                      <label>
                        <input type="checkbox" /> Email notifications
                      </label>
                    </div>
                    <div className={styles.settingOption}>
                      <label>
                        <input type="checkbox" /> Order updates
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}