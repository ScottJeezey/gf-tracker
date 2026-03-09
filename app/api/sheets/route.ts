import { NextResponse } from 'next/server'
import { appendReceiptToSheet } from '@/lib/google-sheets'

export async function POST(request: Request) {
  try {
    const receipt = await request.json()
    const { store, date, items, receiptId } = receipt

    // Transform items into sheet rows
    const rows = items.map((item: any) => ({
      date,
      store,
      itemName: item.name,
      category: item.category,
      totalPrice: item.price,
      regularEquivalentPrice: item.regularEquivalentPrice,
      deductibleAmount: item.deductibleAmount,
      isInherentlyGF: item.isInherentlyGF,
      confidence: item.confidence,
      receiptId,
    }))

    const success = await appendReceiptToSheet(rows)

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to append to Google Sheets' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Sheets API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
