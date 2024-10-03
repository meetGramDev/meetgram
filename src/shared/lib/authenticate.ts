import { SESSION_COOKIE_NAME } from '@/shared/const/consts'
import { decodeJwt } from 'jose'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { NextRequest } from 'next/server'
/**
 * Check if current user is authenticated in the app
 * @param {NextRequest}
 * @returns {boolean}
 */
export function authenticate(req: NextRequest) {
  return req.cookies.has(SESSION_COOKIE_NAME)
}

/**
 * Decode JWT Token from cookies and return user id
 */
export function extractAuthorizedUserData(req: NextRequest) {
  if (!req.cookies.has(SESSION_COOKIE_NAME)) {
    return undefined
  }

  const cookies = req.cookies.get(SESSION_COOKIE_NAME) as RequestCookie

  return decodeJwt<{ userId: number }>(cookies.value).userId
}
