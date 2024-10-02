import { CommentsItems } from '@/features/posts/comments/model/types/commentsType'

export type GetCommentsResponse = {
  find(arg0: (comment: { id: number }) => boolean): unknown
  items: CommentsItems[]
  pageSize: number
  totalCount: number
}

export type AddCommentArgs = {
  content: string
}

export type AddCommentResponse = {
  items: CommentsItems
}
