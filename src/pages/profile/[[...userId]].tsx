import { useCallback, useState } from 'react'

import { useGetPublicPostsQuery } from '@/entities/post'
import { User, selectCurrentUserName, useFullUserProfileQuery } from '@/entities/user'
import { UserSkeleton } from '@/entities/user/ui/skeletons/UserSkeleton'
import { useAppSelector } from '@/shared/config/storeHooks'
import { useClientProgress } from '@/shared/lib'
import { NextPageWithLayout } from '@/shared/types'
import { Loader } from '@/shared/ui'
import { getMainLayout } from '@/widgets/layouts/ui/MainLayout/MainLayout'
import { PostsList } from '@/widgets/postsList'
import { skipToken } from '@reduxjs/toolkit/query'
import { useRouter } from 'next/router'

const PAGE_SIZE = 12

const UserId: NextPageWithLayout = () => {
  const router = useRouter()
  const userName = useAppSelector(selectCurrentUserName)
  const { data: userData, isLoading: userProfileLoading } = useFullUserProfileQuery(
    userName || skipToken
  )

  const userId = router.query.userId

  // =========== //
  const [endCursorPostId, setEndCursorPostId] = useState<number | undefined>(undefined)

  const {
    data: publicPosts,
    isFetching: publicPostsFetching,
    isLoading: publicPostsLoading,
  } = useGetPublicPostsQuery({
    endCursorPostId,
    id: String(userData?.id),
    params: { pageSize: PAGE_SIZE },
  })

  useClientProgress(publicPostsFetching)

  const handleFetchNextPosts = useCallback(() => {
    if (publicPosts?.items && publicPosts.items.length >= PAGE_SIZE) {
      setEndCursorPostId(publicPosts?.items.at(-1)?.id)
    }
  }, [publicPosts?.items])

  return (
    <div className={'h-full'}>
      {!userProfileLoading && userData ? <User userData={userData} /> : <UserSkeleton />}

      {!publicPostsLoading && publicPosts && publicPosts.items.length !== 0 ? (
        <>
          <PostsList fetchNextPosts={handleFetchNextPosts} posts={publicPosts?.items} />
          {publicPostsFetching && (
            <div className={'flex justify-center'}>
              <Loader />
            </div>
          )}
        </>
      ) : (
        <div className={'flex justify-center'}>
          <Loader />
        </div>
      )}
    </div>
  )
}

UserId.getLayout = getMainLayout

export default UserId
