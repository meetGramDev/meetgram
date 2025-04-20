import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'

import SocketIoApi from '@/widgets/notificationsView/model/socketApi'

type NotificationsType = {
  clientId: string
  createdAt: string
  eventType: number
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}

export const useConnectSocket = (token: null | string) => {
  const isConnectedRef = useRef(false)

  const createConnectSocket = (token: string) => {
    SocketIoApi.createConnection(token)
    isConnectedRef.current = true

    SocketIoApi.socket?.on('notifications', (data: NotificationsType) => {
      toast.info(data.message)
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
