import { NextResponse } from 'next/server'
import { analyzeReceiptImage } from '@/lib/anthropic'
import { getBaselinePrices } from '@/lib/google-sheets'
import { RECEIPT_ANALYSIS_PROMPT } from '@/lib/prompts'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    const { image, mediaType } = await request.json()

    // Step 1: Analyze receipt with Claude Vision
    const analysisResult = await analyzeReceiptImage(
      image,
      mediaType,
      RECEIPT_ANALYSIS_PROMPT
    )

    if (!analysisResult.success || !analysisResult.data) {
      return NextResponse.json(
        { error: analysisResult.error || 'Analysis failed' },
        { status: 500 }
      )
    }

    const { store, date, items } = analysisResult.data

    // Step 2: Fetch baseline prices from Google Sheets
    const baselinePrices = await getBaselinePrices()

    // Step 3: Enrich items with deductible amounts
    const receiptId = uuidv4()
    const enrichedItems = items.map((item: any) => {
      const category = item.category.toLowerCase()
      const regularPrice = baselinePrices.get(category) || 0

      return {
        ...item,
        regularEquivalentPrice: item.isInherentlyGF ? 0 : regularPrice,
        deductibleAmount: item.isInherentlyGF
          ? 0
          : Math.max(0, item.price - regularPrice),
        receiptId,
      }
    })

    return NextResponse.json({
      store,
      date,
      items: enrichedItems,
      receiptId,
    })
  } catch (error: any) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
