import { PropsWithChildren, useEffect, useRef, useState } from 'react'

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

  const handleScroll = () => {
    if (!scrollAreaRef.current) {
      return
    }

    const { clientHeight, scrollHeight, scrollTop } = scrollAreaRef.current

    setIsAtBottom(scrollHeight - clientHeight <= scrollTop + 1)
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
      <ChatScrollAnchor
        isAtBottom={isAtBottom}
        scrollAreaRef={scrollAreaRef}
        trackVisibility={isSending}
      />
    </div>
  )
}
