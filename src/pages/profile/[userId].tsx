import { User, selectCurrentUserName, useFullUserProfileQuery } from '@/entities/user'
import { useGetPublicPostsQuery } from '@/features/profile/addPost'
import { useAppSelector } from '@/shared/config/storeHooks'
import { getMainLayout } from '@/widgets/layouts/ui/MainLayout/MainLayout'
import { skipToken } from '@reduxjs/toolkit/query'

function UserId() {
  const userName = useAppSelector(selectCurrentUserName)
  const { data: userData, isLoading } = useFullUserProfileQuery(userName || skipToken)

  const { data: publicPosts, isLoading: publicPostsLoading } = useGetPublicPostsQuery(
    String(userData?.id)
  )

  if (isLoading || publicPostsLoading || !userData?.id) {
    return <div>Loading...</div>
  }

  // @ts-ignore
  return <User posts={publicPosts?.items} userData={userData} />
}

UserId.getLayout = getMainLayout

export default UserId
