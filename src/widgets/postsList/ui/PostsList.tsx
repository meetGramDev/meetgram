import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useMediaQuery } from 'react-responsive'

import { PublicPost } from '@/entities/post'

import { PostsListDesktop } from './postsListDesktop/PostsListDesktop'
import { PostsListMobile } from './postsListMobile/PostsListMobile'

type Props = {
  fetchNextPosts: () => void
  posts: PublicPost[]
}

export const PostsList = ({ fetchNextPosts, posts }: Props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 650px)' })
  const { inView, ref } = useInView()

  useEffect(() => {
    console.log(inView)
    if (inView) {
      fetchNextPosts()
    }
  }, [inView, fetchNextPosts])

  return (
    <>
      {isMobile ? <PostsListMobile posts={posts} /> : <PostsListDesktop posts={posts} />}

      <div ref={ref}></div>
    </>
  )
}
