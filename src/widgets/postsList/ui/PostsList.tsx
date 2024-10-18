import { useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { PublicPost, useGetPublicPostsQuery, useLazyGetPublicPostsQuery } from '@/entities/post'
import { useInfiniteScroll } from '@/shared/lib'
import { Loader } from '@/shared/ui'

import { Posts } from './Posts'

export type PostsListProps = {
  isFollowing?: boolean
  isPublic: boolean
  post: PublicPost
  posts?: PublicPost[]
  userId: number
  userName?: string
}

export const PAGE_SIZE = 12

export const PostsList = ({ isFollowing, isPublic, post, posts, userId }: PostsListProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 650px)' })

  const [getPosts, { data: lazyPublicPosts, isFetching, isLoading, isSuccess }] =
    useLazyGetPublicPostsQuery()

  // =========== //
  const [endCursorPostId, setEndCursorPostId] = useState<number | undefined>(
    isPublic ? posts?.at(-1)?.id : undefined
  )

  const firstRenderSkipPagination = useRef(true)
  const postsScrollRef = useRef<HTMLElement>(null)
  const { ref } = useInfiniteScroll(
    () => {
      if (isPublic && !firstRenderSkipPagination.current && posts && posts?.length >= PAGE_SIZE) {
        console.log(endCursorPostId)
        getPosts({
          endCursorPostId: posts.at(-1)?.id,
          id: String(userId),
          params: { pageSize: PAGE_SIZE },
        })
      }
      firstRenderSkipPagination.current = false

      if (!isPublic && publicPosts && publicPosts.items && publicPosts.items.length >= PAGE_SIZE) {
        setEndCursorPostId(publicPosts?.items.at(-1)?.id)
      }
    },
    { root: postsScrollRef.current, threshold: 0.9 }
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
    { skip: (!userId && !endCursorPostId) || isPublic }
  )

  return (
    <>
      {isPublic && (
        <Posts
          isFollowing={isFollowing}
          isHasData={isSuccess}
          isLoading={isLoading || isFetching}
          post={post}
          posts={posts}
          ref={ref}
          userId={userId}
        />
      )}
      {!isPublic && publicPosts && (
        <Posts
          isFollowing={isFollowing}
          isHasData={publicPostsSuccess}
          isLoading={publicPostsLoading || publicPostsFetching}
          post={post}
          posts={publicPosts.items}
          ref={ref}
          userId={userId}
        />
      )}

      {publicPostsFetching && (
        <div className={'flex justify-center py-3'}>
          <Loader />
        </div>
      )}
    </>
  )
}
