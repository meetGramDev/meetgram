import { Suspense } from 'react'

import { User, selectCurrentUserName, useFullUserProfileQuery } from '@/entities/user'
import { UserSkeleton } from '@/entities/user/ui/skeletons/UserSkeleton'
import { useAppSelector } from '@/shared/config/storeHooks'
import { NextPageWithLayout } from '@/shared/types'
import { Loader } from '@/shared/ui'
import { getMainLayout } from '@/widgets/layouts/ui/MainLayout/MainLayout'
import { PostsList } from '@/widgets/postsList'
import { skipToken } from '@reduxjs/toolkit/query'
import { useRouter } from 'next/router'

const UserId: NextPageWithLayout = () => {
  const router = useRouter()
  const userName = useAppSelector(selectCurrentUserName)
  const {
    data: userData,
    isError: userProfileQueryError,
    isLoading: userProfileLoading,
  } = useFullUserProfileQuery(userName || skipToken)

  const userId = router.query.userId

  return (
    <div className={'h-full'}>
      {!userProfileLoading && userData ? <User userData={userData} /> : <UserSkeleton />}

      <Suspense
        fallback={
          <div className={'flex justify-center'}>
            <Loader />
          </div>
        }
      >
        <PostsList skipFetchingPosts={userProfileQueryError} userId={userData?.id} />
      </Suspense>
    </div>
  )
}

UserId.getLayout = getMainLayout

export default UserId
