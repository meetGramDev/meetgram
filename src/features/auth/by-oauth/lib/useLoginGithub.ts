import { useEffect, useState } from 'react'

import { updateEmail } from '@/entities/user'
import { PROFILE, SIGN_IN } from '@/shared/config/router'
import { useRouter } from 'next/router'

/**
 * Hook manages getting query params such as accessToken and emails
 * returned from backend when user authorises with Github.
 * Then it will redirect to home page
 */
export function useLoginGithub() {
  const router = useRouter()
  const [calledPush, setCalledPush] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const accessToken = params.get('accessToken')
    const email = params.get('email')

    // fix Next error: abort fetching component for some route
    if (calledPush) {
      return
    }

    if (accessToken && email) {
      localStorage.setItem('accessToken', JSON.stringify(accessToken))
      updateEmail(email)
      router.push(PROFILE)

      setCalledPush(true)
    } else {
      router.push(SIGN_IN)

      setCalledPush(true)
    }
  }, [router])
}
