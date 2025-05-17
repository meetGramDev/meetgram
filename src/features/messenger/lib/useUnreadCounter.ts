import { useCallback, useEffect, useState } from 'react'

import { SocketIoApi } from '@/shared/api'

import { MessageModelType } from '../model/types'

export function useUnreadCounter(options?: { shouldCount?: boolean }) {
  const [unreadCount, setUnreadCount] = useState(0)

  const resetCount = useCallback(() => setUnreadCount(0), [])

  useEffect(() => {
    if (!options || !options.shouldCount) {
      return
    }

    const unsubscribe = SocketIoApi.onMessageSent<MessageModelType>(msg => {
      if (msg) {
        setUnreadCount(prev => ++prev)
      }
    })

    return () => unsubscribe()
  }, [options?.shouldCount])

  return { resetCount, unreadCount }
}
