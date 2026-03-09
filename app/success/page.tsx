'use client'

import { useRouter } from 'next/navigation'

export default function SuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-grey-lightest flex items-center justify-center px-4">
      <div className="bg-white rounded-xl border border-grey-light p-8 max-w-md text-center shadow-sm">
        <div className="w-16 h-16 bg-emerald-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-emerald-green"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-dark-text mb-2">
          Receipt Saved!
        </h1>
        <p className="text-grey-dark mb-6">
          Your receipt has been successfully saved to Google Sheets.
        </p>
        <button
          onClick={() => router.push('/')}
          className="w-full px-6 py-3 bg-dark-text text-white rounded-lg font-semibold hover:bg-mint-green hover:text-dark-text transition-colors"
        >
          Upload Another Receipt
        </button>
      </div>
    </div>
  )
}
