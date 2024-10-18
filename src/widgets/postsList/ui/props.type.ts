import { PublicPost } from '@/entities/post'

export type PostListProps = {
  isFollowing?: boolean
  isHasData?: boolean
  isLoading?: boolean
  post: PublicPost
  posts?: PublicPost[]
  userId: number
}
