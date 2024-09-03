import { Avatar } from '@/shared/types'

export type ImageType = {
  createdAt?: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type PublicPost = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: ImageType[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: {
    firstName: string
    lastName: string
  }
  ownerId: number
  updatedAt: string
  userName: string
}

export type GetPublicPostsResponse = {
  items: PublicPost[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export type GetPublicPostsArgs = {
  endCursorPostId?: number
  id: string
  params: {
    pageSize?: number
  }
}

export type UserWhoLikedPost = {
  avatars: Avatar[]
  createdAt: string
  id: number
  userId: number
  userName: string
}

export type GetPostLikesResponse = {
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
