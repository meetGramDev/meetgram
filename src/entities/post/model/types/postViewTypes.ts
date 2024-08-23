import { StaticImport } from 'next/dist/shared/lib/get-img-props'

import { PostType } from '../../ui/Post'

export type PostViewType = {
  avatarOwner: StaticImport | string
  isFollowing: boolean
  isOpen: (open: boolean) => void
  open: boolean
  ownerId: number
  post: PostType
  postCreate: Date
  postId: number
  postLikesCount: number
  userId: number
  userName: string
}
