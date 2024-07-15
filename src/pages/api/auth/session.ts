import { SESSION_COOKIE_NAME } from '@/shared/const/consts'
import { serialize } from 'cookie'
import { decodeJwt } from 'jose'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  if (!req.body) {
    return res.status(400).json({ message: 'Request must contain a token' })
  }
  // receive token send from backend
  const { credentials } = req.body as { credentials: string }

  const { exp } = decodeJwt(credentials)

  res.setHeader(
    'Set-Cookie',
    serialize(SESSION_COOKIE_NAME, credentials, {
      expires: new Date(exp! * 1000),
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: true,
    })
  )

  return res.status(200).json({ message: 'Authenticated' })
}
