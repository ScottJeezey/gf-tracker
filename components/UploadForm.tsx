'use client'

import { useRef, useState } from 'react'

interface UploadFormProps {
  onUpload: (file: File) => void
  isLoading: boolean
}

export default function UploadForm({ onUpload, isLoading }: UploadFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show preview
    const reader = new FileReader()
    reader.onload = (event) => {
      setPreview(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    const file = fileInputRef.current?.files?.[0]
    if (file) {
      onUpload(file)
    }
  }

  const handleCancel = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="bg-white rounded-xl border border-grey-light p-6 shadow-sm">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="receipt-upload"
        disabled={isLoading}
      />

      {!preview ? (
        <label
          htmlFor="receipt-upload"
          className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-grey-light rounded-lg cursor-pointer hover:border-mint-green transition-colors"
        >
          <svg
            className="w-16 h-16 text-grey-mid mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-grey-dark font-medium">
            Tap to take photo or upload
          </span>
          <span className="text-grey-mid text-sm mt-2">
            Supports JPG, PNG, WEBP
          </span>
        </label>
      ) : (
        <div>
          <img
            src={preview}
            alt="Receipt preview"
            className="w-full rounded-lg mb-4 max-h-96 object-contain"
          />
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 px-4 py-3 border-2 border-grey-light rounded-lg font-semibold text-dark-text hover:border-mint-green transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-dark-text text-white rounded-lg font-semibold hover:bg-mint-green hover:text-dark-text transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Receipt'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
