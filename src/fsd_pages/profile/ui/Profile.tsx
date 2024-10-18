import { PublicProfile, User, useFullUserProfileQuery } from '@/entities/user'
import { UserSkeleton } from '@/entities/user/ui/skeletons/UserSkeleton'
import { AddingPostView } from '@/widgets/addingPostView'
import { PostsList } from '@/widgets/postsList'

type Props = {
  id: number
  isPublic?: boolean
  publicUserData: PublicProfile
  userName?: string
}

export const Profile = ({ id, isPublic = false, publicUserData, userName }: Props) => {
  const {
    data: userData,
    isError: isUserProfileError,
    isLoading: userProfileLoading,
    isSuccess,
  } = useFullUserProfileQuery(publicUserData.userName, { skip: isPublic })

  if (!isSuccess || isUserProfileError) {
    return <p className={'mt-40 text-center text-h1'}>Profile was not found</p>
  }

  return (
    <div className={'h-full'}>
      {isPublic && publicUserData && <User userData={publicUserData} />}
      {!isPublic && <>{!userProfileLoading ? <User userData={userData} /> : <UserSkeleton />}</>}

      <PostsList
        userId={userData?.id || id}
        // userName={userName || publicUserData?.userName || ''}
      />
      <AddingPostView />
    </div>
  )
}
