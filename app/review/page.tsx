'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ReviewScreen from '@/components/ReviewScreen'
import type { AnalyzedReceipt } from '@/lib/types'

export default function ReviewPage() {
  const router = useRouter()
  const [receipt, setReceipt] = useState<AnalyzedReceipt | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('analyzedReceipt')
    if (!stored) {
      router.push('/')
      return
    }
    setReceipt(JSON.parse(stored))
  }, [router])

  const handleSubmit = async () => {
    if (!receipt) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(receipt),
      })

      if (!response.ok) {
        throw new Error('Failed to save to Google Sheets')
      }

      // Clear session and redirect
      sessionStorage.removeItem('analyzedReceipt')
      router.push('/success')
    } catch (error) {
      console.error('Submit error:', error)
      alert('Failed to save. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!receipt) {
    return (
      <div className="min-h-screen bg-grey-lightest flex items-center justify-center">
        <p className="text-grey-dark">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-grey-lightest px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-dark-text mb-6">
          Review Receipt
        </h1>

        <ReviewScreen
          receipt={receipt}
          onUpdate={setReceipt}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  )
}
