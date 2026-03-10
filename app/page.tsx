'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import UploadForm from '@/components/UploadForm'

export default function HomePage() {
  const router = useRouter()
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleUpload = async (file: File) => {
    setIsAnalyzing(true)

    try {
      // Convert to base64
      const base64 = await fileToBase64(file)

      // Map file type to supported media types
      let mediaType: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif' = 'image/jpeg'

      if (file.type === 'image/png') {
        mediaType = 'image/png'
      } else if (file.type === 'image/webp') {
        mediaType = 'image/webp'
      } else if (file.type === 'image/gif') {
        mediaType = 'image/gif'
      } else {
        // Default to JPEG for HEIC, HEIF, or any other format
        mediaType = 'image/jpeg'
      }

      // Analyze with Claude
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64,
          mediaType,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Analysis failed')
      }

      const result = await response.json()

      // Store in sessionStorage and navigate to review
      sessionStorage.setItem('analyzedReceipt', JSON.stringify(result))
      router.push('/review')
    } catch (error: any) {
      console.error('Upload error:', error)
      alert(error.message || 'Failed to analyze receipt. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-grey-lightest px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-dark-text mb-2">
          GF Receipt Tracker
        </h1>
        <p className="text-grey-dark mb-8">
          Upload a receipt photo to track your gluten-free food costs.
        </p>

        <UploadForm onUpload={handleUpload} isLoading={isAnalyzing} />
      </div>
    </div>
  )
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      // Remove data URL prefix
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
  })
}
