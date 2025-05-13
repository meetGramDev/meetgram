import { toast } from 'react-toastify'

import { RootState } from '@/app/lib'
import {
  DeleteNotificationByIdRequest,
  GetNotificationsRequest,
  GetNotificationsResponse,
  MarkNotificationsAsReadResponse,
  NotificationType,
  SocketNotificationsType,
} from '@/entities/notification/model/types/service.types'
import { baseApi } from '@/shared/api'
import SocketIoApi from '@/widgets/notificationsView/model/socketApi'

export const notificationsAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteNotificationById: builder.mutation<any, DeleteNotificationByIdRequest>({
      invalidatesTags: ['notifications'],
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
        const token = (getState() as RootState).user.accessToken

        if (!token) {
          return
        }
        SocketIoApi.createConnection(token)
        const socket = SocketIoApi.socket

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
              draft.items.unshift(socketMessage)
              draft.notReadCount += 1
            })
          }

          socket?.on('notifications', listener)
        } catch {
          await cacheEntryRemoved

          socket?.close()
        }

        await cacheEntryRemoved

        socket?.disconnect()
      },
      providesTags: ['notifications'],
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
      invalidatesTags: ['notifications'],
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
