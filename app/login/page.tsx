'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        router.push('/')
      } else {
        setError('Invalid password')
      }
    } catch (err) {
      setError('Connection error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-grey-lightest px-4">
      <div className="bg-white rounded-xl border border-grey-light p-8 w-full max-w-md shadow-sm">
        <h1 className="text-2xl font-semibold text-dark-text mb-2">
          GF Receipt Tracker
        </h1>
        <p className="text-grey-dark text-sm mb-6">
          Track gluten-free food costs for tax deductions
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 border border-grey-light rounded-lg focus:outline-none focus:border-mint-green"
            disabled={isLoading}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-dark-text text-white py-3 rounded-lg font-semibold hover:bg-mint-green hover:text-dark-text transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
