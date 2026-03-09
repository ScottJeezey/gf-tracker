'use client'

import { ReceiptItem } from '@/lib/types'

interface ItemEditorProps {
  item: ReceiptItem
  onUpdate: (updates: Partial<ReceiptItem>) => void
}

export default function ItemEditor({ item, onUpdate }: ItemEditorProps) {
  const confidenceColor = {
    high: 'text-emerald-green',
    medium: 'text-blue-mid',
    low: 'text-grey-mid',
  }[item.confidence]

  return (
    <div className="bg-white rounded-xl border border-grey-light p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-dark-text">{item.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-grey-mid">{item.category}</span>
            <span className={`text-sm font-medium ${confidenceColor}`}>
              {item.confidence} confidence
            </span>
          </div>
        </div>
        <span className="text-lg font-bold text-dark-text">
          ${item.price.toFixed(2)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={item.isGF}
            onChange={(e) => onUpdate({ isGF: e.target.checked })}
            className="w-4 h-4 accent-mint-green"
          />
          <span className="text-grey-dark">Gluten-Free?</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={item.isInherentlyGF}
            onChange={(e) => onUpdate({ isInherentlyGF: e.target.checked })}
            className="w-4 h-4 accent-mint-green"
          />
          <span className="text-grey-dark">Inherently GF?</span>
        </label>
      </div>

      {!item.isInherentlyGF && (
        <div className="mt-3 pt-3 border-t border-grey-light">
          <div className="flex justify-between text-sm">
            <span className="text-grey-dark">Regular equivalent:</span>
            <span className="font-medium text-dark-text">
              ${item.regularEquivalentPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="font-semibold text-emerald-green">Deductible:</span>
            <span className="font-bold text-emerald-green">
              ${item.deductibleAmount.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
