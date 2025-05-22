import { SocketIoApi, baseApi } from '@/shared/api'

import {
  DialogMessagesArgsType,
  DialogMessagesResponseType,
  GetAllDialogsResponseType,
  GetAllMessagesArgsType,
  MessageModelType,
  MessageSendRequestType,
  MessageStatus,
  UpdateMessageStatusArgsType,
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

        currentCacheData.pageSize = responseData.pageSize
        currentCacheData.totalCount = responseData.totalCount
        currentCacheData.items.push(...responseData.items)
      },
      onCacheEntryAdded: async (
        args,
        { cacheDataLoaded, cacheEntryRemoved, dispatch, updateCachedData }
      ) => {
        try {
          await cacheDataLoaded

          // update messages in dialogs list
          const unsubscribe = SocketIoApi.onMessageSent<MessageModelType>(
            msg => {
              console.log('getAllDialogs, MESSAGE_SEND', msg)
              updateCachedData(draft => {
                const index = draft.items.findIndex(
                  dialog =>
                    (msg.ownerId === dialog.receiverId && msg.receiverId === dialog.ownerId) ||
                    (msg.receiverId === dialog.receiverId && msg.ownerId === dialog.ownerId)
                )

                if (index !== -1) {
                  draft.items[index] = { ...draft.items[index], ...msg }
                } else {
                  dispatch(
                    messagesApi.endpoints.getAllDialogs.initiate(args, { forceRefetch: true })
                  )
                }
              })
            },
            { shouldEmitBack: false }
          )

          await cacheEntryRemoved
          unsubscribe()
        } catch (error) {
          console.error('WebSocket error in getAllDialogs:', error)
        }
      },
      providesTags: (result, error, arg) => (!error ? ['dialogs'] : []),
      query: ({ ...params }) => ({
        params,
        url: `/messenger`,
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
    }),
    getMessagesByUser: builder.query<DialogMessagesResponseType, DialogMessagesArgsType>({
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.cursor !== previousArg?.cursor
      },
      keepUnusedDataFor: 0,
      merge(currentCacheData, responseData, otherArgs) {
        if (!otherArgs.arg.cursor) {
          return responseData
        }

        if (responseData.items.length === 0) {
          return currentCacheData
        }

        currentCacheData.pageSize = responseData.pageSize
        currentCacheData.totalCount = responseData.totalCount
        currentCacheData.items.unshift(...responseData.items)
      },
      onCacheEntryAdded: async (
        _,
        { cacheDataLoaded, cacheEntryRemoved, dispatch, updateCachedData }
      ) => {
        let unsubMessageReceived
        let unsubMessageSent

        try {
          await cacheDataLoaded

          // получаем сообщение отправителем
          unsubMessageReceived = SocketIoApi.onMessageReceived<MessageModelType>(msg => {
            // обновляем прочитанные сообщения
            if (Array.isArray(msg)) {
              updateCachedData(draft => {
                msg.forEach(newMsg => {
                  const index = draft.items.findIndex(oldMsg => oldMsg.id === newMsg.id)

                  if (index !== -1) {
                    draft.items[index] = { ...newMsg }
                  }
                })
                console.log('✨ Cache was updated with updated messages array')
              })
            } else {
              // добавляем только что отправленное сообщение
              updateCachedData(draft => {
                draft.items.push(msg)
                console.log('🟢 Cache was updated')
              })
            }
          })

          // принимаем сообщение получателем
          unsubMessageSent = SocketIoApi.onMessageSent<MessageModelType>(msg => {
            updateCachedData(draft => {
              draft.items.push(msg)
              console.log('🟡 Cache was updated')
            })

            //update status of newly sent message to READ
            dispatch(messagesApi.endpoints.updateMessageStatus.initiate({ ids: [msg.id] }))
          })

          await cacheEntryRemoved
          unsubMessageReceived()
          unsubMessageSent()
        } catch (error) {
          console.error('WebSocket error in getMessagesByUser:', error)
          unsubMessageReceived?.()
          unsubMessageSent?.()
        }
      },
      providesTags: ['messages'],
      query: ({ dialoguePartnerId, ...params }) => ({
        params,
        url: `/messenger/${dialoguePartnerId}`,
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) =>
        `${endpointName}${queryArgs.dialoguePartnerId}`,
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
    updateMessageStatus: builder.mutation<void, UpdateMessageStatusArgsType>({
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled

          dispatch(
            messagesApi.util.updateQueryData('getAllDialogs', {}, draft => {
              arg.ids.forEach(id => {
                const index = draft.items.findIndex(dialog => dialog.id === id)

                if (index !== -1) {
                  draft.items[index].status = MessageStatus.READ
                }
              })
            })
          )
        } catch (error) {
          //
        }
      },
      query: body => ({
        body,
        method: 'PUT',
        url: `/messenger`,
      }),
    }),
  }),
})

export const {
  useGetAllDialogsQuery,
  useGetMessagesByUserQuery,
  useLazyGetMessagesByUserQuery,
  useSendMessageMutation,
  useUpdateMessageStatusMutation,
} = messagesApi
