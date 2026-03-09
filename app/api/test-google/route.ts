import { NextResponse } from 'next/server'
import { getBaselinePrices } from '@/lib/google-sheets'

export async function GET() {
  try {
    console.log('Testing Google Sheets connection...');
    console.log('Service account email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);

    const prices = await getBaselinePrices();

    return NextResponse.json({
      success: true,
      message: 'Google Sheets connection successful!',
      baselinePriceCount: prices.size,
      categories: Array.from(prices.keys()),
    });
  } catch (error: any) {
    console.error('Google Sheets test failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}
