import { useEffect, useState } from 'react'

import { setProvider } from '@/entities/user'
import { nextSessionApi } from '@/shared/api/_next-auth'
import { PROFILE, SIGN_IN } from '@/shared/config/router'
import { useAppDispatch } from '@/shared/config/storeHooks'
import { useRouter } from 'next/router'

/**
 * Hook manages getting query params such as accessToken and emails
 * returned from backend when user authorises with Github.
 * Then it will redirect to home page
 */
export function useLoginGithub() {
  const router = useRouter()
  const [calledPush, setCalledPush] = useState(false)
  const dispatch = useAppDispatch()

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

        dispatch(setProvider({ email, provider: 'github' }))
        router.push(router.locale + PROFILE)

        setCalledPush(true)
      } else {
        router.push(SIGN_IN)
        setCalledPush(true)
      }
    }

    authenticate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])
}
