'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import UserDashboard from './components/UserDashboard'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    router.push('/login')
    return null
  }

  return <UserDashboard user={session.user} />
}