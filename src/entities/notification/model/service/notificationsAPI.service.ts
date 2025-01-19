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
      providesTags: ['notifications'],
      query: args => ({
        method: 'GET',
        params: args,
        url: `notifications/`,
      }),
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
