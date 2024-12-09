import { useEffect, useState } from 'react'

/** this hook return how high is screen */
export function useScreenHeightTracker() {
  const [screenHeight, setScreenHeight] = useState(0)

  useEffect(() => {
    const updateHeight = () => {
      setScreenHeight(window.innerHeight)
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)

    return () => {
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  return screenHeight
}
