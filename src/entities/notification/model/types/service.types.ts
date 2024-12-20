export type GetNotificationsRequest = {
  cursor?: string
  isRead?: boolean
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
}

export type SortDirection = 'asc' | 'desc'

export type GetNotificationsResponse<T> = {
  items: T[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type NotificationType = {
  createdAt: string
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}
export type MarkNotificationsAsReadResponse = {
  ids: number[]
}

export type DeleteNotificationByIdRequest = {
  id: number
}
