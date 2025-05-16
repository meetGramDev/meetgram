import { useCallback, useEffect, useState } from 'react'

import { SocketIoApi } from '@/shared/api'
import { WS_MESSENGER_EVENTS_PATHS } from '@/shared/types'

import { MessageModelType } from '../model/types'

export function useUnreadCounter(options?: { shouldCount?: boolean }) {
  const [unreadCount, setUnreadCount] = useState(0)

  const handleOnBottomScrolled = useCallback(() => setUnreadCount(0), [])

  useEffect(() => {
    SocketIoApi.onMessageSent<MessageModelType>(msg => {
      if (!options || !options.shouldCount) {
        return
      }

      if (msg) {
        setUnreadCount(prev => ++prev)
      }
    })

    return () => SocketIoApi.disconnectListeners([WS_MESSENGER_EVENTS_PATHS.MESSAGE_SEND])
  }, [])

  return { handleOnBottomScrolled, setUnreadCount, unreadCount }
}
