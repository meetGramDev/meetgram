import { useEffect } from 'react'

import { selectAccessToken } from '@/entities/user'
import { SocketIoApi } from '@/shared/api'
import { useAppSelector } from '@/shared/config/storeHooks'

export function useConnectSocket() {
  const token = useAppSelector(selectAccessToken)

  useEffect(() => {
    if (!token) {
      return
    }

    SocketIoApi.createConnection(token)

    return () => SocketIoApi.closeConnection()
  }, [token])
}
