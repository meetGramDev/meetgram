import {
  CREATE_NEW_PASSWORD,
  FORGOT_PASSWORD,
  PROFILE,
  SIGN_IN,
  SIGN_UP,
} from '@/shared/config/router'
import { authenticate } from '@/shared/lib/authenticate'
import { NextRequest, NextResponse } from 'next/server'

const authRoutes = [
  SIGN_IN,
  SIGN_UP,
  CREATE_NEW_PASSWORD,
  FORGOT_PASSWORD,
  '/auth',
  '/password-recovery',
]

export async function middleware(req: NextRequest) {
  const isAuth = authenticate(req)
  const currentPath = req.nextUrl.pathname
  const isAuthRoute = authRoutes.includes(currentPath)

  if (isAuth && isAuthRoute) {
    return NextResponse.redirect(new URL(PROFILE, req.url + req.nextUrl.locale))
  }
  if (!isAuth && !isAuthRoute) {
    return NextResponse.redirect(new URL(SIGN_IN, req.url + req.nextUrl.locale))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|github).*)',
  ],
}
