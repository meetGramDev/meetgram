import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'

import SocketIoApi from '@/widgets/notificationsView/model/socketApi'

export const useConnectSocket = (token: null | string) => {
  const isConnectedRef = useRef(false)

  const createConnectSocket = (token: string) => {
    SocketIoApi.createConnection(token)
    isConnectedRef.current = true
    SocketIoApi.socket?.on('notification', (data: any) => {
      console.log('notification connected')
      toast.info(data)
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
