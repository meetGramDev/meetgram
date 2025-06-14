import { toast } from 'react-toastify'

import { SocketIoApi, baseApi } from '@/shared/api'

import {
  DeleteNotificationByIdRequest,
  GetNotificationsRequest,
  GetNotificationsResponse,
  MarkNotificationsAsReadResponse,
  NotificationType,
  SocketNotificationsType,
} from '../types/service.types'

export const notificationsAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteNotificationById: builder.mutation<any, DeleteNotificationByIdRequest>({
      query: args => ({
        method: 'DELETE',
        url: `notifications/${args.id}`,
      }),
    }),
    getUserNotifications: builder.query<
      GetNotificationsResponse<NotificationType>,
      GetNotificationsRequest
    >({
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.cursor !== previousArg?.cursor
      },
      merge: (currentCacheData, responseData, { arg }) => {
        if (!arg.cursor) {
          return responseData
        }
        currentCacheData.items.push(...responseData.items)
        currentCacheData.notReadCount = responseData.notReadCount
        currentCacheData.pageSize = responseData.pageSize
        currentCacheData.totalCount = responseData.totalCount
      },
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, getState, updateCachedData }
      ) {
        let unsubscribe

        try {
          await cacheDataLoaded

          const listener = (event: SocketNotificationsType) => {
            // const data = JSON.parse(event.)
            const socketMessage: NotificationType = {
              createdAt: event.notifyAt,
              id: event.id,
              isRead: event.isRead,
              message: event.message,
              notifyAt: event.notifyAt,
            }

            toast.info(event.message)
            updateCachedData(draft => {
              const findMessage = draft.items.find(elem => {
                return elem.id === event.id
              })

              if (findMessage === undefined || findMessage.id === socketMessage.id) {
                return
              }
              draft.items.unshift(socketMessage)
              draft.notReadCount += 1
            })
          }

          unsubscribe = SocketIoApi.onNotifications(listener)
        } catch {
          await cacheEntryRemoved

          unsubscribe?.()
        }

        await cacheEntryRemoved

        unsubscribe?.()
      },

      query: ({ cursor, isRead, pageSize, sortBy, sortDirection }) => {
        let url = `notifications/`

        if (cursor) {
          url += cursor
        }

        return {
          method: 'GET',
          params: { isRead, pageSize, sortBy, sortDirection },
          url,
        }
      },
      serializeQueryArgs: ({ queryArgs }) => {
        return `${queryArgs.pageSize}`
      },
    }),
    markNotificationAsRead: builder.mutation<void, MarkNotificationsAsReadResponse>({
      async onQueryStarted({ ids }, { dispatch, getState, queryFulfilled }) {
        const patchResult = dispatch(
          notificationsAPI.util.updateQueryData('getUserNotifications', {}, draft => {
            draft.items.forEach(item => {
              if (ids.includes(item.id) && !item.isRead) {
                item.isRead = true
                draft.notReadCount -= 1
              }
            })
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      query: ids => ({
        body: ids,
        method: 'PUT',
        url: 'notifications/mark-as-read',
      }),
    }),
  }),
})

export const {
  useDeleteNotificationByIdMutation,
  useGetUserNotificationsQuery,
  useMarkNotificationAsReadMutation,
} = notificationsAPI
