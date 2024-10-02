import { Avatar } from '@/shared/types'

export type UserWhoLikedPost = {
  avatars: Avatar[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export type GetWhoLikedPostRequest = {
  params?: {
    cursor?: number
    pageNumber?: number
    pageSize?: number
    searchQuery?: string
  }
  postId: number
}

export type GetWhoLikedPostResponse = {
  isLiked: boolean
  items: UserWhoLikedPost[]
  nextCursor: null | number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export type LikeStatus = 'DISLIKE' | 'LIKE' | 'NONE'

export type GiveLikeToPostArgs = {
  likeStatus: LikeStatus
  postId: number
}
