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
      console.log('File info:', { name: file.name, type: file.type, size: file.size })

      // Compress and convert to base64
      const base64 = await compressImage(file)
      console.log('Compressed base64 length:', base64.length)

      // We always compress to JPEG for optimal size/quality balance
      const mediaType = 'image/jpeg'
      console.log('Using mediaType:', mediaType)

      // Analyze with Claude
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64,
          mediaType: mediaType,
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

// Compress and resize image if needed
async function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        // Maximum dimensions (Claude Vision works well with these)
        const MAX_WIDTH = 1568
        const MAX_HEIGHT = 1568

        let width = img.width
        let height = img.height

        // Calculate scaling to fit within max dimensions
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height)
          width = Math.floor(width * ratio)
          height = Math.floor(height * ratio)
        }

        // Create canvas and draw resized image
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, width, height)

        // Convert to JPEG with quality 0.9
        const base64 = canvas.toDataURL('image/jpeg', 0.9).split(',')[1]
        resolve(base64)
      }
      img.onerror = reject
      img.src = e.target?.result as string
    }
    reader.onerror = reject
  })
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
