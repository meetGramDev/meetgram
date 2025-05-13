import { baseApi } from '@/shared/api'
import SocketIoApi from '@/widgets/notificationsView/model/socketApi'

import {
  DialogMessagesArgsType,
  DialogMessagesResponseType,
  GetAllDialogsResponseType,
  GetAllMessagesArgsType,
  MessageModelType,
  MessageSendRequestType,
  MessageStatus,
  WS_MESSENGER_EVENTS_PATHS,
} from '../types'

export const messagesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllDialogs: builder.query<GetAllDialogsResponseType, GetAllMessagesArgsType>({
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.cursor !== previousArg?.cursor
      },
      merge: (currentCacheData, responseData, otherArgs) => {
        if (!otherArgs.arg.cursor) {
          return responseData
        }

        Object.assign(currentCacheData, responseData)
        currentCacheData.items.push(...responseData.items)
      },
      onCacheEntryAdded: async (_, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) => {
        try {
          await cacheDataLoaded

          const ws = SocketIoApi.socket

          if (!ws) {
            throw new Error('No Socket instance is available')
          }

          ws.on(
            WS_MESSENGER_EVENTS_PATHS.MESSAGE_SEND,
            (
              msg: MessageModelType,
              callback: (params: { message: MessageModelType; receiverId: number }) => void
            ) => {
              console.log('getAllDialogs, MESSAGE_SEND', msg)
              callback({ message: msg, receiverId: msg.receiverId })
            }
          )

          await cacheEntryRemoved
          ws.off(WS_MESSENGER_EVENTS_PATHS.MESSAGE_SEND)
        } catch (error) {
          console.error('WebSocket error in getAllDialogs:', error)
        }
      },
      providesTags: (result, error, arg) => (!error ? ['messages'] : []),
      query: ({ ...params }) => ({
        params,
        url: `/messenger`,
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
    }),
    getMessagesByUser: builder.query<DialogMessagesResponseType, DialogMessagesArgsType>({
      keepUnusedDataFor: 0,
      onCacheEntryAdded: async (args, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) => {
        try {
          await cacheDataLoaded

          const ws = SocketIoApi.socket

          if (!ws) {
            throw new Error('No Socket instance is available')
          }

          ws.on(WS_MESSENGER_EVENTS_PATHS.RECEIVE_MESSAGE, (msg: MessageModelType) => {
            console.log('🟢getMessagesByUser, RECEIVE_MESSAGE')
            updateCachedData(draft => {
              draft.items.push(msg)
            })
          })

          ws.on(WS_MESSENGER_EVENTS_PATHS.MESSAGE_SEND, (msg: MessageModelType) => {
            console.log('🟡getMessagesByUser, MESSAGE_SEND')
            updateCachedData(draft => {
              msg.status = MessageStatus.READ
              draft.items.push(msg)
            })
          })

          await cacheEntryRemoved
          ws.off(WS_MESSENGER_EVENTS_PATHS.RECEIVE_MESSAGE)
          ws.off(WS_MESSENGER_EVENTS_PATHS.MESSAGE_SEND)
        } catch (error) {
          console.error('WebSocket error in getMessagesByUser:', error)
        }
      },
      query: ({ dialoguePartnerId, ...params }) => ({
        params,
        url: `/messenger/${dialoguePartnerId}`,
      }),
      transformResponse(response: DialogMessagesResponseType) {
        // сообщения в исходном массиве расположены от нового к старому
        response.items.reverse()

        return response
      },
    }),
    sendMessage: builder.mutation<
      { message: MessageModelType; receiverId: number } | null,
      MessageSendRequestType
    >({
      queryFn: messageObj => {
        const ws = SocketIoApi.socket

        if (!ws) {
          return {
            error: {
              error: "Failed to send message. WebSocket isn't connected",
              status: 'CUSTOM_ERROR',
            },
          }
        }

        let message = null

        ws.emit(
          WS_MESSENGER_EVENTS_PATHS.RECEIVE_MESSAGE,
          messageObj,
          (val: { message: MessageModelType; receiverId: number }) => {
            console.log('Send message emitted', val)
            message = val
          }
        )

        return { data: message || null }
      },
    }),
  }),
})

export const {
  useGetAllDialogsQuery,
  useGetMessagesByUserQuery,
  useLazyGetMessagesByUserQuery,
  useSendMessageMutation,
} = messagesApi
