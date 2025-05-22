import { RefObject, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { cn } from '@/shared/lib'

type ChatAnchorProps = {
  className?: string
  isAtBottom: boolean
  scrollAreaRef: RefObject<HTMLDivElement>
  /**
   * This flag indicates whether we should be tracking the visibility of the anchor element.
   * If this is false, there are no new messages being streamed, and we do not programmatically scroll.
   */
  trackVisibility: boolean
}

export const ChatScrollAnchor = ({
  className,
  isAtBottom,
  scrollAreaRef,
  trackVisibility,
}: ChatAnchorProps) => {
  const { entry, inView, ref } = useInView({ delay: 100, trackVisibility: trackVisibility })

  useEffect(() => {
    if (isAtBottom && trackVisibility && !inView) {
      if (!scrollAreaRef.current) {
        return
      }
      const { clientHeight, scrollHeight } = scrollAreaRef.current

      scrollAreaRef.current.scrollTop = scrollHeight - clientHeight
    }
  }, [inView, entry, isAtBottom, trackVisibility])

  return <div className={cn('h-px w-full', className)} ref={ref}></div>
}
