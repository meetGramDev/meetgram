import { Suspense } from 'react'

import {
  User,
  selectCurrentUserName,
  useFullUserProfileQuery,
  useGetPublicProfileByIdQuery,
} from '@/entities/user'
import { UserSkeleton } from '@/entities/user/ui/skeletons/UserSkeleton'
import { useAppSelector } from '@/shared/config/storeHooks'
import { NextPageWithLayout } from '@/shared/types'
import { Loader } from '@/shared/ui'
import { AddingPostView } from '@/widgets/addingPostView'
import { getMainLayout } from '@/widgets/layouts'
import { PostsList } from '@/widgets/postsList'
import { skipToken } from '@reduxjs/toolkit/query'
import { useRouter } from 'next/router'

const UserId: NextPageWithLayout = () => {
  const router = useRouter()
  const userId = router.query.userId as string
  const { data: userDataById, isError: isProfileByIdError } = useGetPublicProfileByIdQuery(
    userId || skipToken
  )

  const authUsername = useAppSelector(selectCurrentUserName)
  const { data: userData, isLoading: userProfileLoading } = useFullUserProfileQuery(
    userDataById?.userName || authUsername || skipToken,
    { skip: isProfileByIdError }
  )

  if (isProfileByIdError) {
    return <p className={'mt-40 text-center text-h1'}>Profile was not found</p>
  }

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
        <PostsList userName={userDataById?.userName || authUsername} />
      </Suspense>

      <AddingPostView />
    </div>
  )
}

UserId.getLayout = getMainLayout

export default UserId
