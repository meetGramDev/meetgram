import { CommentsItems } from '@/features/posts/comments/model/types/commentsType'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

import { PostType } from '../../ui/Post'

export type PostViewType = {
  avatarOwner: StaticImport | string
  isFollowing: boolean
  isOpen: (open: boolean) => void
  open: boolean
  ownerId: number
  post: PostType
  postCreate: string
  postId: number
  postLikesCount: number
  userId: number
  userName: string
}

export type GetCommentsResponse = {
  items: CommentsItems[]
  pageSize: number
  totalCount: number
}

export type GetCommentsArgs = {
  params: {
    pageNumber?: number
    pageSize?: number
  }
  postId: number
}

export type AddCommentArgs = {
  content: string
}

export type AddCommentResponse = {
  items: CommentsItems
}
