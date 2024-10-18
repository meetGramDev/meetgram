import { PublicPost } from '@/entities/post'

export type PostListProps = {
  isFollowing?: boolean
  isHasData?: boolean
  isLoading?: boolean
  posts?: PublicPost[]
  userId: number
}
