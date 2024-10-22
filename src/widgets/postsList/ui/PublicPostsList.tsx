import { useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { GetPublicPostsResponse, PublicPost } from '@/entities/post'
import { showToastError, useInfiniteScroll } from '@/shared/lib'
import { Loader } from '@/shared/ui'
import { getPublicPosts } from '@/widgets/postsList/api/getPublicPosts'

import { PAGE_SIZE } from './PostsList'
import { PostsListDesktop } from './postsListDesktop/PostsListDesktop'
import { PostsListMobile } from './postsListMobile/PostsListMobile'

type Props = {
  post: PublicPost
  posts: GetPublicPostsResponse
  userId: number
}

export const PublicPostsList = ({ post, posts, userId }: Props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 650px)' })

  const [currentPosts, setCurrentPosts] = useState<GetPublicPostsResponse>(posts)

  const firstRenderSkipPagination = useRef(true)
  const postsScrollRef = useRef<HTMLElement>(null)
  const { ref } = useInfiniteScroll(
    async () => {
      if (
        !firstRenderSkipPagination.current &&
        currentPosts.items.length >= PAGE_SIZE &&
        currentPosts.items.length !== currentPosts.totalCount
      ) {
        try {
          const data = await getPublicPosts({
            endCursorPostId: currentPosts.items.at(-1)?.id,
            id: String(userId),
            params: { pageSize: PAGE_SIZE },
          })

          setCurrentPosts(prevState => ({ ...data, items: [...prevState.items, ...data.items] }))
        } catch (error) {
          showToastError(error)
        }
      }

      firstRenderSkipPagination.current = false
    },
    { root: postsScrollRef.current, threshold: 1 }
  )

  return (
    <>
      {isMobile ? (
        <PostsListMobile post={post} posts={currentPosts.items} userId={userId} />
      ) : (
        <PostsListDesktop post={post} posts={currentPosts.items} userId={userId} />
      )}

      {currentPosts.items.length !== posts?.totalCount && (
        <div className={'flex justify-center py-5'} ref={ref}>
          <Loader />
        </div>
      )}

      {currentPosts.items.length === 0 && (
        <div className={'w-full text-center leading-loose'}>No posts</div>
      )}
    </>
  )
}
