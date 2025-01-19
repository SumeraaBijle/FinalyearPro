'use client'

import React, { useEffect } from 'react' // Import React
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AuthForm from './AuthForm'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Handle redirection after rendering
  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (session) {
    return null // Avoid rendering anything while redirecting
  }

  return <AuthForm />
}
