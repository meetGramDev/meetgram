import { WS_MESSENGER_EVENTS_PATHS } from '@/shared/types'
import io, { Socket } from 'socket.io-client'

import { BASE_URL } from './baseUrl'

const checkConnection = Symbol()

export const SocketIoApi = Object.freeze(
  (function () {
    let instance: Socket | null = null

    return {
      [checkConnection]() {
        if (!instance) {
          // throw new Error('Socket connection not established')
          return
        }
      },

      closeConnection() {
        instance?.disconnect()
      },

      createConnection(token: string) {
        if (instance?.connected) {
          return
        }
        const queryParams = {
          query: {
            accessToken: token,
          },
          transports: ['websocket'],
        }

        instance = io(BASE_URL.replace(/\/api\/v\d+/g, ''), queryParams)
        instance.on('connect', () => {
          console.log('ws: socket connected', instance?.connected)
        })
        instance.on('disconnect', () => {
          console.log('ws: disconnected', instance?.disconnected)
        })
      },

      disconnectListeners(events: string[]) {
        events.forEach(e => {
          instance?.removeAllListeners(e)
        })
      },

      onMessageReceived<M>(callback?: (msg: M) => void) {
        this[checkConnection]()

        instance?.on(WS_MESSENGER_EVENTS_PATHS.RECEIVE_MESSAGE, (msg: M) => {
          console.log('🟢 Sender: message was received')

          if (!callback) {
            return
          }

          callback(msg)
        })
      },

      onMessageSent<M extends object>(callback?: (msg: M) => void) {
        this[checkConnection]()

        instance?.on(WS_MESSENGER_EVENTS_PATHS.MESSAGE_SEND, (msg: M) => {
          console.log('🟡 Receiver: message was sent')

          if (!callback) {
            return
          }

          callback(msg)
        })
      },

      onNotifications<D>(callback?: (data: D) => void) {
        this[checkConnection]()

        instance?.on('notifications', (data: D) => {
          if (!callback) {
            return
          }

          callback(data)
        })
      },

      sendMessage<M>(msg: M) {
        this[checkConnection]()
        instance?.emit(WS_MESSENGER_EVENTS_PATHS.RECEIVE_MESSAGE, msg)
      },

      get socket() {
        return instance
      },

      set socket(_) {
        throw new Error('Change socket instance is not allowed!')
      },
    }
  })()
)
