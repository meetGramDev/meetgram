import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { PublicPost, useGetPublicPostsQuery } from '@/entities/post'
import { useInfiniteScroll } from '@/shared/lib'
import { Loader } from '@/shared/ui'

import { PostsListDesktop } from './postsListDesktop/PostsListDesktop'
import { PostsListMobile } from './postsListMobile/PostsListMobile'

export type PostsListProps = {
  isFollowing?: boolean
  post: PublicPost
  userId: number
  userName?: string
}

export const PAGE_SIZE = 12

export const PostsList = ({ isFollowing, post, userId }: PostsListProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 650px)' })
  // =========== //
  const [endCursorPostId, setEndCursorPostId] = useState<number | undefined>(undefined)

  const firstRenderSkipPagination = useRef(true)
  const { ref } = useInfiniteScroll(
    () => {
      if (
        !firstRenderSkipPagination.current &&
        publicPosts &&
        publicPosts?.items &&
        publicPosts.items.length >= PAGE_SIZE &&
        publicPosts.items.length !== publicPosts.totalCount
      ) {
        setEndCursorPostId(publicPosts?.items.at(-1)?.id)
      }

      if (firstRenderSkipPagination.current) {
        firstRenderSkipPagination.current = false
      }
    },
    { threshold: 0.9 }
  )

  const {
    data: publicPosts,
    isFetching: publicPostsFetching,
    isLoading: publicPostsLoading,
    isSuccess: publicPostsSuccess,
  } = useGetPublicPostsQuery(
    {
      endCursorPostId,
      id: String(userId),
      params: { pageSize: PAGE_SIZE },
    },
    { skip: !userId && !endCursorPostId }
  )

  useEffect(() => {
    //TODO: check is it possible replace undefined with null
    if (userId && endCursorPostId !== undefined) {
      setEndCursorPostId(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  return (
    <>
      {publicPostsSuccess && (
        <>
          {isMobile ? (
            <PostsListMobile
              isFollowing={isFollowing}
              post={post}
              posts={publicPosts.items}
              userId={userId}
            />
          ) : (
            <PostsListDesktop
              isFollowing={isFollowing}
              post={post}
              posts={publicPosts.items}
              userId={userId}
            />
          )}
          {publicPosts?.items.length !== publicPosts?.totalCount && (
            <div className={'flex justify-center py-5'} ref={ref}>
              <Loader />
            </div>
          )}
        </>
      )}
      {publicPosts && publicPosts.items.length === 0 && (
        <p className={'w-full text-center leading-loose'}>
          No posts yet <br />
        </p>
      )}

      {publicPostsLoading && (
        <div className={'flex justify-center py-3'}>
          <Loader />
        </div>
      )}
    </>
  )
}
