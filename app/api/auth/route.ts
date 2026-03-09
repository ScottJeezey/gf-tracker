import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password === process.env.APP_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set('gf-tracker-auth', password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
