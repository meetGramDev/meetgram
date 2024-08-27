import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { useGetPublicPostsQuery } from '@/entities/post'
import { useInfiniteScroll } from '@/shared/lib'
import { Loader } from '@/shared/ui'

import { PostsListDesktop } from './postsListDesktop/PostsListDesktop'
import { PostsListMobile } from './postsListMobile/PostsListMobile'

type Props = {
  skipFetchingPosts: boolean
  userId: number | undefined
}

const PAGE_SIZE = 12

export const PostsList = ({ skipFetchingPosts, userId }: Props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 650px)' })

  // =========== //
  const [endCursorPostId, setEndCursorPostId] = useState<number | undefined>(undefined)

  const { ref, scroll } = useInfiniteScroll(() => {
    if (publicPosts?.items && publicPosts.items.length >= PAGE_SIZE) {
      setEndCursorPostId(publicPosts?.items.at(-1)?.id)
    }
  })

  const {
    data: publicPosts,
    isFetching: publicPostsFetching,
    isLoading: publicPostsLoading,
  } = useGetPublicPostsQuery(
    {
      endCursorPostId,
      id: String(userId),
      params: { pageSize: PAGE_SIZE },
    },
    { skip: (!userId && !endCursorPostId) || skipFetchingPosts }
  )

  return (
    <>
      {isMobile ? (
        <PostsListMobile posts={publicPosts?.items || []} />
      ) : (
        <PostsListDesktop posts={publicPosts?.items || []} />
      )}

      {!publicPostsLoading && scroll > 0 && (
        <div className={'invisible h-4 w-full'} ref={ref}></div>
      )}

      {publicPostsFetching && (
        <div className={'flex justify-center'}>
          <Loader />
        </div>
      )}
    </>
  )
}
