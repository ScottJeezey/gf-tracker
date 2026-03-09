'use client'

import { AnalyzedReceipt } from '@/lib/types'
import ItemEditor from './ItemEditor'

interface ReviewScreenProps {
  receipt: AnalyzedReceipt
  onUpdate: (receipt: AnalyzedReceipt) => void
  onSubmit: () => void
  isSubmitting: boolean
}

export default function ReviewScreen({
  receipt,
  onUpdate,
  onSubmit,
  isSubmitting,
}: ReviewScreenProps) {
  const updateItem = (index: number, updates: any) => {
    const updatedItems = [...receipt.items]
    updatedItems[index] = { ...updatedItems[index], ...updates }

    // Recalculate deductible amount if checkboxes changed
    if ('isInherentlyGF' in updates || 'isGF' in updates) {
      const item = updatedItems[index]
      if (item.isInherentlyGF) {
        item.deductibleAmount = 0
        item.regularEquivalentPrice = 0
      } else {
        item.deductibleAmount = Math.max(0, item.price - item.regularEquivalentPrice)
      }
    }

    onUpdate({ ...receipt, items: updatedItems })
  }

  const totalDeductible = receipt.items.reduce(
    (sum, item) => sum + item.deductibleAmount,
    0
  )

  return (
    <div className="space-y-6">
      {/* Receipt header */}
      <div className="bg-white rounded-xl border border-grey-light p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-grey-dark uppercase tracking-wide">
              Store
            </label>
            <p className="text-dark-text font-medium mt-1">{receipt.store}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-grey-dark uppercase tracking-wide">
              Date
            </label>
            <p className="text-dark-text font-medium mt-1">{receipt.date}</p>
          </div>
        </div>
      </div>

      {/* Items list */}
      <div className="space-y-3">
        {receipt.items.map((item, index) => (
          <ItemEditor
            key={index}
            item={item}
            onUpdate={(updates) => updateItem(index, updates)}
          />
        ))}
      </div>

      {/* Summary */}
      <div className="bg-emerald-green/10 border border-emerald-green rounded-xl p-6">
        <div className="flex justify-between items-center">
          <span className="text-grey-dark font-medium">
            Total Deductible Amount
          </span>
          <span className="text-2xl font-bold text-emerald-green">
            ${totalDeductible.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => window.history.back()}
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 border-2 border-grey-light rounded-lg font-semibold text-dark-text hover:border-mint-green transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-dark-text text-white rounded-lg font-semibold hover:bg-mint-green hover:text-dark-text transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save to Google Sheets'}
        </button>
      </div>
    </div>
  )
}
