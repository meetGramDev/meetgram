import { useEffect, useState } from 'react'
import { IntersectionOptions, useInView } from 'react-intersection-observer'

/**
 * useInfiniteScroll return object
 */
interface UseInfiniteScrollReturn {
  inView: boolean
  ref: (node?: Element | null) => void
  scroll: number
}

/**
 * @param callback is triggered by DOM element in view
 * @param extraOptions options for the IntersectionObserver
 * @returns {UseInfiniteScrollReturn} It will return an object containing a ref to assign to DOM element
 * you want to track, the inView status and scroll position.
 */
export function useInfiniteScroll(
  callback: () => void,
  extraOptions?: IntersectionOptions
): UseInfiniteScrollReturn {
  const { inView, ref } = useInView(extraOptions)
  const [scroll, setScroll] = useState(0)

  const handleScroll = () => {
    setScroll(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (inView || scroll > 0) {
      callback()
    }
  }, [inView, scroll, callback])

  return { inView, ref, scroll }
}
