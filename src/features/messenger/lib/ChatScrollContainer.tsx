import { PropsWithChildren, useEffect, useRef, useState } from 'react'

import { ToTheEnd } from '../ui/buttons/ToTheEnd'
import { ChatScrollAnchor } from './ChatScrollAnchor'

type Props = {
  className?: string
  /**
   * A flag enables an auto-scroll when new messages are being loaded/streamed
   */
  isSending: boolean
} & PropsWithChildren

export const ChatScrollContainer = ({ children, className, isSending = false }: Props) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = useState(false)

  const [showArrow, setShowArrow] = useState(false)

  const handleScroll = () => {
    if (!scrollAreaRef.current) {
      return
    }

    const { clientHeight, scrollHeight, scrollTop } = scrollAreaRef.current

    if (scrollHeight - clientHeight > scrollTop + 100) {
      setShowArrow(true)
    } else {
      setShowArrow(false)
    }

    setIsAtBottom(scrollHeight - clientHeight <= scrollTop + 1)
  }

  const handleScrollToTheBottom = () => {
    if (!scrollAreaRef.current) {
      return
    }

    scrollAreaRef.current.scrollTo({
      behavior: 'smooth',
      top: scrollAreaRef.current.scrollHeight - scrollAreaRef.current.clientHeight,
    })

    setShowArrow(false)
  }

  useEffect(() => {
    if (isSending) {
      if (!scrollAreaRef.current) {
        return
      }

      const { clientHeight, scrollHeight } = scrollAreaRef.current

      scrollAreaRef.current.scrollTop = scrollHeight - clientHeight

      setIsAtBottom(true)
    }
  }, [isSending])

  return (
    <div className={className} onScroll={handleScroll} ref={scrollAreaRef}>
      {children}
      {showArrow && <ToTheEnd className={'ml-auto mr-3'} onClick={handleScrollToTheBottom} />}
      <ChatScrollAnchor
        isAtBottom={isAtBottom}
        scrollAreaRef={scrollAreaRef}
        trackVisibility={isSending}
      />
    </div>
  )
}
