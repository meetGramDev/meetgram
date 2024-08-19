import { PostType } from '@/entities/post/ui/Post'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export type PostViewType = {
  avatarOwner: StaticImport | string
  id: number
  isFollowing: boolean
  isOpen: (open: boolean) => void
  open: boolean
  ownerId: number
  post: PostType
  postCreate: Date
  postId: number
  postLikesCount: number
  userName: string
}
