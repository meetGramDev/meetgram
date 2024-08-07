import { User, selectCurrentUserName, useFullUserProfileQuery } from '@/entities/user'
import { useGetPublicPostsQuery } from '@/features/profile/addPost'
import { useAppSelector } from '@/shared/config/storeHooks'
import { NextPageWithLayout } from '@/shared/types'
import { getMainLayout } from '@/widgets/layouts/ui/MainLayout/MainLayout'
import { skipToken } from '@reduxjs/toolkit/query'
import { useRouter } from 'next/router'

function UserId(): NextPageWithLayout {
  const router = useRouter()
  const userName = useAppSelector(selectCurrentUserName)
  const { data: userData, isLoading } = useFullUserProfileQuery(userName || skipToken)

  const { data: publicPosts, isLoading: publicPostsLoading } = useGetPublicPostsQuery(
    String(userData?.id)
  )

  const userId = router.query.userId

  if (isLoading || publicPostsLoading || !userData?.id) {
    // @ts-ignore
    return <div>Loading...</div>
  }

  // @ts-ignore
  return <User posts={publicPosts?.items} userData={userData} />
}

UserId.getLayout = getMainLayout

export default UserId
