import { useCallback, useState } from 'react'

export function useAnimateMessageBubble() {
  const [latestMessage, setLatestMessage] = useState<null | string>(null)

  const resetAnimation = useCallback(() => setTimeout(() => setLatestMessage(null), 300), [])

  return { latestMessage, resetAnimation, setLatestMessage }
}
