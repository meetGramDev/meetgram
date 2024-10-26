import { CommentsItems } from '@/features/posts/comments/model/types/commentsType'

export type GetCommentsResponse = {
  items: CommentsItems[]
  pageSize: number
  totalCount: number
}

export type AddCommentArgs = {
  content: string
}

export type AddCommentResponse = {
  answerCount: number
  content: string
  createdAt: string
  from: {
    avatars: []
    id: number
    username: string
  }
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}
