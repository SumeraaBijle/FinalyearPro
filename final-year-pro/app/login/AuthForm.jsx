'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'; // Import next-auth's signIn
import styles from '../../styles/AuthForm.module.css';


export default function AuthForm() {
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (isRegister) {
      // Handle registration
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        })
        if (res.ok) {
          // After successful registration, sign in the user
          await signIn('credentials', {
            email,
            password,
            callbackUrl: '/',
          })
        }
      } catch (error) {
        console.error('Registration error:', error)
      }
    } else {
      // Handle sign in
      try {
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        })
        if (result?.error) {
          console.error('Authentication error:', result.error)
        }
      } catch (error) {
        console.error('Sign in error:', error)
      }
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleGoogleLogin = () => {
    signIn('google')
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.box} ${isDarkMode ? styles.dark : ''}`}>
        <div className={styles.header}>
          <h2>{isRegister ? 'Create Account' : 'Sign In'}</h2>
          <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle dark mode">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {isRegister && (
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            {isRegister ? 'Register' : 'Sign In'}
          </button>
        </form>
        <button onClick={handleGoogleLogin} className={styles.googleBtn}>
          Login with Google
        </button>
        <div className={styles.switchMode}>
          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  )
}

