import { SESSION_COOKIE_NAME } from '@/shared/const/consts'
import { NextRequest } from 'next/server'
/**
 * Check if current user is authenticated in the app
 * @param {NextRequest}
 * @returns {boolean}
 */
export function authenticate(req: NextRequest) {
  return req.cookies.has(SESSION_COOKIE_NAME)
}
