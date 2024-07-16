import { useEffect } from 'react'

import { useRouter } from 'next/router'
import NProgress from 'nprogress'

NProgress.configure({
  minimum: 0.2,
  speed: 300,
})

const startLoading = () => NProgress.start()
const endLoading = () => NProgress.done()

/**
 * A hook will show the progress bar at the top of the page
 * when routes are changing.
 */
export function useProgressBar() {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', startLoading)
    router.events.on('routeChangeComplete', endLoading)
    router.events.on('routeChangeError', endLoading)

    return () => {
      router.events.off('routeChangeStart', startLoading)
      router.events.off('routeChangeComplete', endLoading)
      router.events.off('routeChangeError', endLoading)
    }
  }, [router])
}

/**
 * A hook will show the progress bar at the top of the page
 * when some event happens on the client side.
 * @param {boolean} isLoading define when to start and end the progress
 */
export function useClientProgress(isLoading: boolean) {
  useEffect(() => {
    isLoading ? startLoading() : endLoading()
  }, [isLoading])
}
