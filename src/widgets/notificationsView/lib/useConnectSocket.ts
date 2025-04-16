import { Socket, io } from 'socket.io-client'

class SocketIoApi {
  static socket: Socket | null

  static createConnection(token: string) {
    const queryParams = {
      query: {
        accessToken: token,
      },
    }

    this.socket = io('https://inctagram.work', queryParams)
    this.socket.on('connect', () => {
      console.log('ws: socket connected')
    })
    this.socket.on('disconnect', () => {
      console.log('ws: disconnected')
    })
  }
}

export default SocketIoApi
