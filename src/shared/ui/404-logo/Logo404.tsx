import { useEffect, useRef, useState } from 'react'

import s from './logo404.module.scss'

type Collision = {
  xRange: number
  yRange: number
}

type Props = { xStart?: number; yStart?: number }

const xSpeed = 4
const ySpeed = 3

export const Logo404 = ({ xStart, yStart }: Props) => {
  const logo = useRef<HTMLDivElement | null>(null)

  const [xPosition, setXPosition] = useState(xStart ?? 0)
  const [yPosition, setYPosition] = useState(yStart ?? 0)

  const [isMoveHorizontal, setIsMoveHorizontal] = useState(true)
  const [isMoveVertical, setIsMoveVertical] = useState(true)

  const [collision, setCollision] = useState<Collision>({
    xRange: 0,
    yRange: 0,
  })

  const requestAnimationFrameId = useRef<null | number>(null)

  const moveLogo = () => {
    if (isMoveHorizontal) {
      setXPosition(xPosition + xSpeed)

      if (xPosition >= collision.xRange) {
        setIsMoveHorizontal(false)
      }
    } else {
      setXPosition(xPosition - xSpeed)

      if (xPosition <= 0) {
        setIsMoveHorizontal(true)
      }
    }

    if (isMoveVertical) {
      setYPosition(yPosition + ySpeed)

      if (yPosition >= collision.yRange) {
        setIsMoveVertical(false)
      }
    } else {
      setYPosition(yPosition - ySpeed)

      if (yPosition <= 0) {
        setIsMoveVertical(true)
      }
    }
  }

  const getCollisions = () => {
    if (logo.current === null) {
      return
    }

    setCollision({
      xRange: window.innerWidth - logo.current.clientWidth,
      yRange: window.innerHeight - logo.current.clientHeight,
    })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getCollisions()
    }
  }, [])

  useEffect(() => {
    requestAnimationFrameId.current = requestAnimationFrame(moveLogo)

    return () => {
      if (requestAnimationFrameId.current !== null) {
        cancelAnimationFrame(requestAnimationFrameId.current)
      }
    }
  })

  useEffect(() => {
    window.addEventListener('resize', getCollisions)

    return () => {
      window.removeEventListener('resize', getCollisions)
    }
  })

  return (
    <div
      className={s.errorCode}
      ref={logo}
      style={{ left: `${xPosition}px`, top: `${yPosition}px` }}
    >
      {' '}
      404{' '}
    </div>
  )
}
