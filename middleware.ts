import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow login page and API routes
  if (
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname.startsWith('/api/')
  ) {
    return NextResponse.next()
  }

  // Check for auth cookie
  const authCookie = request.cookies.get('gf-tracker-auth')

  if (!authCookie || authCookie.value !== process.env.APP_PASSWORD) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
