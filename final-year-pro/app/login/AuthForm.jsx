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
    <div className={`min-h-screen bg-gradient-to-b from-purple-100 via-purple-50 to-pink-50 ${isDarkMode ? "dark" : ""}`}>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-purple-100">
          <div className="px-8 pt-8 pb-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-semibold text-gray-800">
                {isRegister ? "Create Account" : "Welcome Back"}
              </h2>
              <button
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 rounded-full bg-purple-50 hover:bg-purple-100 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {isRegister && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-white/90 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                    placeholder="Enter your name"
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-white/90 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                  className="w-full px-4 py-3 bg-white/90 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 mt-6 font-medium"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  isRegister ? "Create Account" : "Sign In"
                )}
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-purple-100"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/70 text-gray-500">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>
            </form>

            <div className="mt-8 text-center">
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
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                {isRegister ? "Already have an account? Sign In" : "Don't have an account? Register"}
              </button>
            </div>

            {message && (
              <div
                className={`mt-6 p-4 rounded-xl ${
                  message.includes("successful")
                    ? "bg-green-50 text-green-800 border border-green-100"
                    : "bg-red-50 text-red-800 border border-red-100"
                }`}
                role="alert"
              >
                <p className="text-sm font-medium">{message}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}