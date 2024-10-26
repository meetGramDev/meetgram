import { FollowLikeItemType, PaginationQueriesType, PaginationType } from '@/shared/types'

export type GetWhoLikedPostRequest = {
  postId: number
} & PaginationQueriesType

export type GetWhoLikedPostResponse = {
  isLiked: boolean
} & PaginationType<FollowLikeItemType>

export type LikeStatus = 'DISLIKE' | 'LIKE' | 'NONE'

export type GiveLikeToPostArgs = {
  likeStatus: LikeStatus
  postId: number
}
