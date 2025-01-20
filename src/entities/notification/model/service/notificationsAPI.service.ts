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
      merge: (currentCacheData, responseData, otherArgs) => {
        if (!otherArgs.arg.cursor) {
          return responseData
        }

        Object.assign(currentCacheData, responseData)
        currentCacheData.items.push(...responseData.items)
      },
      providesTags: ['notifications'],
      query: args => {
        let url = `notifications/`

        if (args.cursor) {
          url += args.cursor
        }

        return {
          method: 'GET',
          params: args,
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
