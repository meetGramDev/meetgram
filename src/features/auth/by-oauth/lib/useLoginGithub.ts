import { useEffect, useState } from 'react'

import { useLazyMeQuery } from '@/entities/user'
import { nextSessionApi } from '@/shared/api/_next-auth'
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
  const [getMe] = useLazyMeQuery()

  useEffect(() => {
    const authenticate = async function () {
      const params = new URLSearchParams(window.location.search)
      const accessToken = params.get('accessToken')
      const email = params.get('email')

      // fix Next error: abort fetching component for some route
      if (calledPush) {
        return
      }

      if (accessToken && email) {
        await nextSessionApi.makeSession(accessToken)
        const res = await getMe().unwrap()

        router.push(`${PROFILE}/${res.userId}`, undefined, { locale: router.locale })

        setCalledPush(true)
      } else {
        router.push(SIGN_IN, undefined, { locale: router.locale })
        setCalledPush(true)
      }
    }

    authenticate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])
}
