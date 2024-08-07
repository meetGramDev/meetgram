import { useMediaQuery } from 'react-responsive'

import { GetPublicPostsResponse } from '@/features/profile/addPost'

import { PostsListDesktop } from './postsListDesktop/PostsListDesktop'
import { PostsListMobile } from './postsListMobile/PostsListMobile'

type Props = {
  posts: GetPublicPostsResponse
}

export const PostsList = ({ posts }: Props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 650px)' })

  return (
    <>
      {isMobile ? (
        <PostsListMobile posts={posts.items} />
      ) : (
        <PostsListDesktop posts={posts.items} />
      )}
    </>
  )
}
