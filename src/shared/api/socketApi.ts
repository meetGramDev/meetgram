import { WS_MESSENGER_EVENTS_PATHS } from '@/shared/types'
import io, { Socket } from 'socket.io-client'

import { BASE_URL } from './baseUrl'

const checkConnection = Symbol()
const listeners = Symbol('listeners')

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
        this.disconnectListeners([...Object.values(WS_MESSENGER_EVENTS_PATHS), 'notifications'])
        instance?.disconnect()
        this[listeners].clear()
        instance = null
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

      disconnectListener(event: string, listener: (...args: any[]) => void) {
        if (instance) {
          instance.off(event, listener)
        }
      },

      disconnectListeners(events: string[]) {
        events.forEach(e => {
          instance?.removeAllListeners(e)
        })
      },

      [listeners]: new Map(),

      onMessageReceived<M>(callback?: (msg: M | M[]) => void) {
        this[checkConnection]()

        const listener = (msg: M) => {
          console.log('🟢 Sender: message was received')
          console.log('🟢 Get messages', msg)

          callback?.(msg)
        }

        const listenerKey = Symbol('onMessageReceived-handler')

        this[listeners].set(listenerKey, listener)

        instance?.on(WS_MESSENGER_EVENTS_PATHS.RECEIVE_MESSAGE, listener)

        return () => {
          this.disconnectListener(WS_MESSENGER_EVENTS_PATHS.RECEIVE_MESSAGE, listener)
          this[listeners].delete(listenerKey)
        }
      },

      onMessageSent<M extends object>(
        callback?: (msg: M) => void,
        options: { shouldEmitBack: boolean } = { shouldEmitBack: true }
      ) {
        this[checkConnection]()

        const listener = (msg: M) => {
          console.log('🟡 Receiver: message was sent')

          if (options.shouldEmitBack) {
            this.sendMessage<{ message: M; receiverId: number }>({
              message: msg,
              receiverId: (msg as { receiverId: number }).receiverId,
            })
          }

          callback?.(msg)
        }
        const listenerKey = Symbol('onMessageSent-handler')

        this[listeners].set(listenerKey, listener)

        instance?.on(WS_MESSENGER_EVENTS_PATHS.MESSAGE_SEND, listener)

        return () => {
          this.disconnectListener(WS_MESSENGER_EVENTS_PATHS.MESSAGE_SEND, listener)
          this[listeners].delete(listenerKey)
        }
      },

      onNotifications<D>(callback?: (data: D) => void) {
        this[checkConnection]()

        const listener = (data: D) => {
          if (!callback) {
            return
          }

          callback(data)
        }

        const listenerKey = Symbol('notification-handler')

        this[listeners].set(listenerKey, listener)

        instance?.on('notifications', listener)

        return () => {
          this.disconnectListener('notifications', listener)
          this[listeners].delete(listenerKey)
        }
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
