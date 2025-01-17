'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="text-gray-700">
          {error === 'AccessDenied' && 'You do not have permission to sign in.'}
          {error === 'Configuration' && 'There is a problem with the server configuration.'}
          {error === 'Verification' && 'The verification link may have expired or has already been used.'}
          {!error && 'An unknown error occurred during authentication.'}
        </p>
        <a
          href="/login"
          className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Back to Login
        </a>
      </div>
    </div>
  )
}