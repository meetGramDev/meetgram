import { Avatar } from './common'

/* Following/Followers and Likes */
export type FollowLikeItemType = {
  avatars: Avatar[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export type PaginationType<T> = {
  items: T[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export type PaginationQueriesType = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  searchQuery?: string
}
