import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export type CommentsType = {
  items: CommentsItems[]
}

export type CommentsItems = {
  answerCount: number
  content: string
  createdAt: string
  from: CommentsItemsFrom
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

type CommentsItemsFrom = {
  avatars: Avatars[]
  id: number
  username: string
}

type Avatars = {
  createdAt?: string
  fileSize?: number
  height?: number
  url: StaticImport | string
  width?: number
}
