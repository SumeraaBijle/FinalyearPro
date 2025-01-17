'use client'

import { SessionProvider } from 'next-auth/react'
import { Suspense } from 'react'

function LoadingSpinner() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
    </SessionProvider>
  )
}