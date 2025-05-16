import { SocketIoApi, baseApi } from '@/shared/api'
import { WS_MESSENGER_EVENTS_PATHS } from '@/shared/types'

import {
  DialogMessagesArgsType,
  DialogMessagesResponseType,
  GetAllDialogsResponseType,
  GetAllMessagesArgsType,
  MessageModelType,
  MessageSendRequestType,
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

          SocketIoApi.onMessageSent<MessageModelType>(msg => {
            console.log('getAllDialogs, MESSAGE_SEND', msg)
          })

          await cacheEntryRemoved
          SocketIoApi.disconnectListeners([WS_MESSENGER_EVENTS_PATHS.MESSAGE_SEND])
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
      onCacheEntryAdded: async (_, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) => {
        try {
          await cacheDataLoaded

          // получаем сообщение отправителем
          SocketIoApi.onMessageReceived<MessageModelType>(msg => {
            updateCachedData(draft => {
              draft.items.push(msg)
            })
          })

          // принимаем сообщение получателем
          SocketIoApi.onMessageSent<MessageModelType>(msg => {
            updateCachedData(draft => {
              draft.items.push(msg)
            })
          })

          await cacheEntryRemoved
          SocketIoApi.disconnectListeners([
            WS_MESSENGER_EVENTS_PATHS.RECEIVE_MESSAGE,
            WS_MESSENGER_EVENTS_PATHS.MESSAGE_SEND,
          ])
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
        try {
          SocketIoApi.sendMessage(messageObj)

          return { data: null }
        } catch (error) {
          return {
            error: {
              error: `Failed to send message. ${error}`,
              status: 'CUSTOM_ERROR',
            },
          }
        }
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
