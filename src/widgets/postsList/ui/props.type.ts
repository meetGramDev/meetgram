import { PublicPost } from '@/entities/post'

export type PostListProps = {
  isFollowing: boolean
  post: PublicPost
  posts: PublicPost[]
  userId: number
}
