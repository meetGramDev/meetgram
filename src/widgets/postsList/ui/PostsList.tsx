import { useMediaQuery } from 'react-responsive'

import { PublicPost } from '@/entities/post'
import { useInfiniteScroll } from '@/shared/lib'

import { PostsListDesktop } from './postsListDesktop/PostsListDesktop'
import { PostsListMobile } from './postsListMobile/PostsListMobile'

type Props = {
  fetchNextPosts: () => void
  posts: PublicPost[]
}

export const PostsList = ({ fetchNextPosts, posts }: Props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 650px)' })

  const { ref, scroll } = useInfiniteScroll(fetchNextPosts)

  return (
    <>
      {isMobile ? <PostsListMobile posts={posts} /> : <PostsListDesktop posts={posts} />}

      {scroll > 0 && <div className={'invisible h-4 w-full'} ref={ref}></div>}
    </>
  )
}
