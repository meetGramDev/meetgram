import { PublicPost } from '@/entities/post'

export type PostListProps = {
  isFollowing: boolean
  posts: PublicPost[]
  userId: number
}
