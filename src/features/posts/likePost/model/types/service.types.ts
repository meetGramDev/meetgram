import { Avatar } from '@/shared/types'

export type UserWhoLikedPost = {
  avatars: Avatar[]
  createdAt: string
  id: number
  userId: number
  userName: string
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
