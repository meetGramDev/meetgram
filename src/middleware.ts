import { PROFILE, SIGN_IN } from '@/shared/config/router'
import { authenticate, extractAuthorizedUserData } from '@/shared/lib/authenticate'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const isAuth = authenticate(req)
  const isAuthRoute = req.nextUrl.pathname.startsWith('/auth')
  const userId = extractAuthorizedUserData(req)

  if (isAuth && isAuthRoute) {
    return NextResponse.redirect(new URL(PROFILE, req.url + req.nextUrl.locale))
  }
  if (isAuth && req.nextUrl.pathname.match(new RegExp('^\\' + PROFILE + '$'))) {
    return NextResponse.redirect(new URL(`${PROFILE}/${userId}`, req.url + req.nextUrl.locale))
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
     * - page redirected from github OAuth
     */
    '/((?!api|_next/static|_next/image|favicon.ico|github|terms-of-service|privacy-policy|public-page|profile/*).*)',
  ],
}
