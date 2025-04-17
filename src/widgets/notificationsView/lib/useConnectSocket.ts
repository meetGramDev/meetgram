import { useEffect, useRef } from 'react'

import SocketIoApi from '@/widgets/notificationsView/model/socketApi'

export const useConnectSocket = (token: null | string) => {
  const isConnectedRef = useRef(false)

  const createConnectSocket = (token: string) => {
    SocketIoApi.createConnection(token)
    isConnectedRef.current = true
    SocketIoApi.socket?.on('NOTIFICATION', (data: any) => {
      console.log('notification connected')
      console.log('NOTIFICATION', data)
    })
  }

  useEffect(() => {
    if (!token || isConnectedRef.current) {
      return
    }

    const socket = SocketIoApi.socket

    if (socket && socket.connected) {
      isConnectedRef.current = true

      return
    }

    createConnectSocket(token)

    return () => {
      console.log('notification disconnected')
      socket?.disconnect()
    }
  }, [token])
}
