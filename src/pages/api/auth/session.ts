import { SESSION_COOKIE_NAME } from '@/shared/const/consts'
import cookies from 'cookie'
import { decodeJwt } from 'jose'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<SessionResponse>) {
  if (req.method === 'POST') {
    if (!req.body) {
      return res.status(400).json({ message: 'Request must contain a token' })
    }
    // receive token send from backend
    const { credentials } = req.body as { credentials: string }

    const { exp } = decodeJwt(credentials)

    res.setHeader(
      'Set-Cookie',
      cookies.serialize(SESSION_COOKIE_NAME, credentials, {
        expires: new Date(exp! * 1000),
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: true,
      })
    )

    return res.status(200).json({ message: 'Authenticated' })
  }

  if (req.method === 'GET') {
    const cookie = cookies.parse(req.headers.cookie || '') as { [SESSION_COOKIE_NAME]: string }

    if (cookie[SESSION_COOKIE_NAME]) {
      return res.status(200).json({ accessToken: cookie[SESSION_COOKIE_NAME] })
    } else {
      return res.status(401).send({ error: 'Unauthenticated' })
    }
  }

  if (req.method === 'DELETE') {
    res.setHeader(
      'Set-Cookie',
      cookies.serialize(SESSION_COOKIE_NAME, '', {
        expires: new Date(0),
        path: '/',
      })
    )

    return res.status(200).json({ message: 'Success' })
  }
}

type SessionResponse = { accessToken: string } | { error: string } | { message: string }
