import io, { Socket } from 'socket.io-client'

class SocketIoApi {
  static socket: Socket | null

  static createConnection(token: string) {
    if (this.socket?.connected) {
      return
    }
    const queryParams = {
      query: {
        accessToken: token,
      },
      transports: ['websocket'],
    }

    this.socket = io('https://inctagram.work', queryParams)
    this.socket.on('connect', () => {
      console.log('ws: socket connected', this.socket?.connected)
    })
    this.socket.on('disconnect', () => {
      console.log('ws: disconnected', this.socket?.disconnected)
    })
  }
}

export default SocketIoApi
