import { ReactNode, RefObject, forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/shared/lib'
import { Nullable } from '@/shared/types'

import { FloatButton } from '../ui/buttons/FloatButton'
import { ToTheEnd } from '../ui/buttons/ToTheEnd'
import { UnreadCount } from '../ui/buttons/UnreadCount'
import { ChatScrollAnchor } from './ChatScrollAnchor'
import { useUnreadCounter } from './useUnreadCounter'

type Props = {
  /**
   * Optional render prop that receives scrollAreaRef
   */
  children?:
    | ((props: { isAtBottom: boolean; ref: RefObject<HTMLDivElement> }) => ReactNode | undefined)
    | ReactNode
  className?: string
  /**
   * A flag enables an auto-scroll when new messages are being loaded/streamed
   */
  isSending: boolean
  /**
   * Callback function triggered when the scroll position reaches the bottom of the container.
   */
  onBottom?: () => void
  scrollThreshold?: number
  unreadCount?: number
}

/**
 * Component's children can optionally either a ReactNode or a render prop function that receives scrollAreaRef and isAtBottom flag
 */
export const ChatScrollContainer = forwardRef<HTMLDivElement, Props>(
  ({ children, className, isSending = false }, forwardedRef) => {
    const scrollAreaRef = useRef<Nullable<HTMLDivElement>>(null)
    const [isAtBottom, setIsAtBottom] = useState(false)
    const [show, setShow] = useState(false)

    const { resetCount, unreadCount } = useUnreadCounter({ shouldCount: !isAtBottom })

    const scrollThreshold = unreadCount ? 50 : 200

    // merge both local and external refs
    const setRefs = useCallback(
      (element: HTMLDivElement | null) => {
        // Set internal ref
        if (scrollAreaRef) {
          scrollAreaRef.current = element
        }

        // Set forwarded ref
        if (typeof forwardedRef === 'function') {
          forwardedRef(element)
        } else if (forwardedRef) {
          forwardedRef.current = element
        }
      },
      [forwardedRef]
    )

    const handleScroll = () => {
      if (!scrollAreaRef.current) {
        return
      }

      const { clientHeight, scrollHeight, scrollTop } = scrollAreaRef.current

      if (scrollHeight - clientHeight > scrollTop + scrollThreshold) {
        setShow(true)
      } else {
        setShow(false)
      }

      const isBottom = scrollHeight - clientHeight <= scrollTop + 1

      setIsAtBottom(isBottom)
      if (isBottom) {
        resetCount()
      }
    }

    const handleScrollToTheBottom = () => {
      if (!scrollAreaRef.current) {
        return
      }

      scrollAreaRef.current.scrollTo({
        behavior: 'smooth',
        top: scrollAreaRef.current.scrollHeight - scrollAreaRef.current.clientHeight,
      })

      setShow(false)
      setIsAtBottom(true)
      resetCount()
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
      <div className={className} onScroll={handleScroll} ref={setRefs}>
        {typeof children === 'function' ? children?.({ isAtBottom, ref: scrollAreaRef }) : children}
        {show && (
          <FloatButton
            className={cn(
              unreadCount ? 'left-1/2 min-w-[150px] max-w-[200px] -translate-x-1/2' : 'ml-auto mr-3'
            )}
            onClick={handleScrollToTheBottom}
          >
            {unreadCount ? <UnreadCount unread={unreadCount} /> : <ToTheEnd />}
          </FloatButton>
        )}
        <ChatScrollAnchor
          isAtBottom={isAtBottom}
          scrollAreaRef={scrollAreaRef}
          trackVisibility={isSending}
        />
      </div>
    )
  }
)

ChatScrollContainer.displayName = 'ChatScrollContainer'
