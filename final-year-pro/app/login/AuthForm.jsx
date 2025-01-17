'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'; // Import next-auth's signIn
import styles from '../../styles/AuthForm.module.css';

export default function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [message, setMessage] = useState('');  // To store the message
  const router = useRouter();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');  // Clear any previous messages

    if (isRegister) {
      // Handle registration
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        const result = await res.json();

        if (res.ok) {
          // After successful registration, show success message
          setMessage('User registered successfully!');
          router.push('/login');  // Redirect to the login page
        } else {
          setMessage(result.message || 'Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Registration error:', error);
        setMessage('An error occurred during registration.');
      }
    } else {
      // Handle sign in
      try {
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
          callbackUrl: '/dashboard',
        });
        if (!result?.error) {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Sign in error:', error);
        setMessage('An error occurred during login.');
      }
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

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
        {/* Google Login Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
        >
          Sign in with Google
        </button>
        <div className={styles.switchMode}>
          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>

        {/* Display the message */}
        {message && (
          <div className={styles.message}>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
