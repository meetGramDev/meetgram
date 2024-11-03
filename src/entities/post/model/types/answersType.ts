import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export type AnswersType = {
  items: AnswersItems[]
}

export type AnswersItems = {
  commentId: number
  content: string
  createdAt: string
  from: AnswersItemsFrom
  id: number
  isLiked: boolean
  likeCount: number
}

type AnswersItemsFrom = {
  avatars: Avatars[]
  id: number
  username: string
}

export type GetAnswersResponse = {
  items: AnswersItems[]
  pageSize: number
  totalCount: number
}

type Avatars = {
  createdAt?: string
  fileSize?: number
  height?: number
  url: StaticImport | string
  width?: number
}

export type AddAnswersArgs = {
  content: string
}
export type AddAnswerResponse = {
  items: AnswersItems
}
