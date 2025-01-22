"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import styles from "../../styles/AuthForm.module.css"
import Header from "../head/foot/Header"
import Footer from "../head/foot/Footer"

export default function AuthForm() {
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage("")
    setIsLoading(true)

    try {
      if (!isRegister) {
        const result = await signIn("credentials", {
          redirect: false,
          email: email.trim(),
          password: password.trim(),
        })

        if (result?.error) {
          setMessage(result.error)
        } else {
          router.push("/homepage")
          router.refresh()
        }
      } else {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
          }),
        })

        const data = await res.json()

        if (res.ok) {
          setMessage("Registration successful! Please sign in.")
          setIsRegister(false)
          // Clear form
          setName("")
          setEmail("")
          setPassword("")
        } else {
          setMessage(data.message || "Registration failed")
        }
      }
    } catch (error) {
      console.error("Auth error:", error)
      setMessage(isRegister ? "Registration failed" : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn("google", { callbackUrl: "/homepage" })
    } catch (error) {
      console.error("Google sign in error:", error)
      setMessage("Google sign in failed")
      setIsLoading(false)
    }
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <Header />
      <main className="flex-grow">
        <div className={styles.container}>
          <div className={`${styles.box} ${isDarkMode ? styles.dark : ""}`}>
            <div className={styles.header}>
              <h2>{isRegister ? "Create Account" : "Sign In"}</h2>
              <button
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={styles.themeToggle}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? "☀️" : "🌙"}
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
                    disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                  minLength={6}
                />
              </div>
              <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? "Please wait..." : isRegister ? "Register" : "Sign In"}
              </button>
            </form>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
              disabled={isLoading}
            >
              Sign in with Google
            </button>
            <div className={styles.switchMode}>
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister)
                  setMessage("")
                  setEmail("")
                  setPassword("")
                  setName("")
                }}
                disabled={isLoading}
              >
                {isRegister ? "Already have an account? Sign In" : "Don't have an account? Register"}
              </button>
            </div>
            {message && (
              <div
                className={`${styles.message} ${message.includes("successful") ? styles.success : styles.error}`}
                role="alert"
              >
                <p>{message}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

