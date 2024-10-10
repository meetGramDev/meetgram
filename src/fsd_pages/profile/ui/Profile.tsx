import { Suspense } from 'react'

import { PublicPost } from '@/entities/post'
import { PublicProfile, User, useFullUserProfileQuery } from '@/entities/user'
import { useFollowUserMutation } from '@/features/follow'
import { Loader } from '@/shared/ui'
import { AddingPostView } from '@/widgets/addingPostView'
import { PostsList } from '@/widgets/postsList'
import { skipToken } from '@reduxjs/toolkit/query'

type Props = {
  id: number
  post: PublicPost
  publicUserData?: PublicProfile
  userName?: string
}

export const Profile = ({ id, post, publicUserData, userName }: Props) => {
  // const router = useRouter()
  // const userId = router.query.userId as string
  // const {
  //   data: userDataById,
  //   isError: isProfileByIdError,
  //   isLoading: isProfileByIdLoading,
  // } = useGetPublicProfileByIdQuery(userId || skipToken)

  // const authUsername = useAppSelector(selectCurrentUserName)
  const {
    data: userData,
    isError: isUserProfileError,
    isLoading: userProfileLoading,
    isSuccess,
  } = useFullUserProfileQuery(userName || skipToken, { skip: !userName })

  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation()

  if (isUserProfileError) {
    return <p className={'mt-40 text-center text-h1'}>Profile was not found</p>
  }

  return (
    <div className={'h-full'}>
      {publicUserData && !userData && <User userData={publicUserData} />}
      {!publicUserData && userData && (
        <User
          disabledFollowBtn={isFollowLoading}
          isLoading={userProfileLoading}
          onFollow={userId => followUser({ selectedUserId: userId })}
          userData={userData}
        />
      )}

      <Suspense
        fallback={
          <div className={'flex justify-center'}>
            <Loader />
          </div>
        }
      >
        <PostsList
          post={post}
          userId={userData?.id || id}
          userName={userName || publicUserData?.userName || ''}
        />
      </Suspense>
      <AddingPostView />
    </div>
  )
}
