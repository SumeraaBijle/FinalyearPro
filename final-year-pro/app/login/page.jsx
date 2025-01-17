'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AuthForm from './AuthForm'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (session) {
    router.push('/dashboard')
    return null
  }

  return <AuthForm />
}