import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
    // Handle form submission logic here
    console.log('Form submitted', { isRegister, name, email, password })
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

