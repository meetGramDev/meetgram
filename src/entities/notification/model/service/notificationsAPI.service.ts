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
      query: ({ cursor, isRead, pageSize, sortBy, sortDirection }) => ({
        method: 'GET',
        url: `notifications/${cursor}?sortBy=${sortBy}&sortDirection=${sortDirection || 'desc'}&isRead=${isRead}&pageSize=${pageSize}`,
      }),
    }),
    markNotificationAsRead: builder.mutation<void, MarkNotificationsAsReadResponse>({
      query: ids => ({
        body: { ids },
        method: 'POST',
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
