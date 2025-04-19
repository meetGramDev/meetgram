import { RootState } from '@/app/lib'
import {
  DeleteNotificationByIdRequest,
  GetNotificationsRequest,
  GetNotificationsResponse,
  MarkNotificationsAsReadResponse,
  NotificationType,
} from '@/entities/notification/model/types/service.types'
import { baseApi } from '@/shared/api'

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
