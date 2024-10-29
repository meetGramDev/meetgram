import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { PublicPost } from '@/entities/post'
import { useGetPublicPostsQuery } from '@/entities/post/model/services/posts.service'
import { useFullUserProfileQuery } from '@/entities/user'
import { useInfiniteScroll } from '@/shared/lib'
import { Loader } from '@/shared/ui'
import { skipToken } from '@reduxjs/toolkit/query'

import { PostsListDesktop } from './postsListDesktop/PostsListDesktop'
import { PostsListMobile } from './postsListMobile/PostsListMobile'

type Props = {
  post: PublicPost
  userName: string
}

const PAGE_SIZE = 12

export const PostsList = ({ post, userName }: Props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 650px)' })
  const {
    data: currentUser,
    isError: userProfileQueryError,
    isSuccess: isUserSuccess,
  } = useFullUserProfileQuery(userName || skipToken)

  // =========== //
  const [endCursorPostId, setEndCursorPostId] = useState<number | undefined>(undefined)

  const { ref, scroll } = useInfiniteScroll(
    () => {
      if (publicPosts?.items && publicPosts.items.length >= PAGE_SIZE) {
        setEndCursorPostId(publicPosts?.items.at(-1)?.id)
      }
    },
    { threshold: 1 }
  )

  const {
    data: publicPosts,
    isFetching: publicPostsFetching,
    isLoading: publicPostsLoading,
    isSuccess: publicPostsSuccess,
  } = useGetPublicPostsQuery(
    {
      endCursorPostId,
      id: String(currentUser?.id),
      params: { pageSize: PAGE_SIZE },
    },
    { skip: (!currentUser?.id && !endCursorPostId) || userProfileQueryError }
  )

  return (
    <>
      {publicPostsSuccess && (
        <>
          {isMobile
            ? isUserSuccess && (
                <>
                  <PostsListMobile
                    isFollowing={currentUser.isFollowing}
                    post={post}
                    posts={publicPosts.items}
                    userId={currentUser.id}
                  />
                </>
              )
            : isUserSuccess && (
                <>
                  <PostsListDesktop
                    isFollowing={currentUser.isFollowing}
                    post={post}
                    posts={publicPosts.items}
                    userId={currentUser.id}
                  />
                </>
              )}
        </>
      )}
      {publicPosts && publicPosts.items.length === 0 && (
        <p className={'w-full text-center leading-loose'}>
          No posts yet <br />
        </p>
      )}

      {!publicPostsLoading && scroll > 0 && (
        <div className={'invisible h-4 w-full'} ref={ref}></div>
      )}

      {publicPostsFetching && (
        <div className={'flex justify-center py-3'}>
          <Loader />
        </div>
      )}
    </>
  )
}
