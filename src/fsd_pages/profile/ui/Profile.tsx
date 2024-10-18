import { PublicPost } from '@/entities/post'
import { PublicProfile, User, useFullUserProfileQuery } from '@/entities/user'
import { UserSkeleton } from '@/entities/user/ui/skeletons/UserSkeleton'
import { useFollowUserMutation } from '@/features/follow'
import { AddingPostView } from '@/widgets/addingPostView'
import { PostsList } from '@/widgets/postsList'

type Props = {
  id: number
  isPublic?: boolean
  post: PublicPost
  publicUserData: PublicProfile
  userName?: string
}

export const Profile = ({ id, isPublic = false, post, publicUserData, userName }: Props) => {
  const {
    data: userData,
    isError: isUserProfileError,
    isLoading: userProfileLoading,
    isSuccess,
  } = useFullUserProfileQuery(publicUserData.userName, { skip: isPublic })

  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation()

  if (!isSuccess || isUserProfileError) {
    return <p className={'mt-40 text-center text-h1'}>Profile was not found</p>
  }

  return (
    <div className={'h-full'}>
      {isPublic && publicUserData && <User userData={publicUserData} />}
      {!isPublic && (
        <>
          {!userProfileLoading ? (
            <User
              disabledFollowBtn={isFollowLoading}
              onFollow={userId => followUser({ selectedUserId: userId })}
              userData={userData}
            />
          ) : (
            <UserSkeleton />
          )}
        </>
      )}

      <PostsList
        // userName={userName || publicUserData?.userName || ''}
        post={post}
        userId={userData?.id || id}
      />
      <AddingPostView />
    </div>
  )
}
