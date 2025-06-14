import { GetPublicPostsResponse, PublicPost } from '@/entities/post'
import { PublicProfile, User, useFullUserProfileQuery } from '@/entities/user'
import { UserSkeleton } from '@/entities/user/ui/skeletons/UserSkeleton'
import { useFollowUserMutation } from '@/features/follow'
import { AddingPostView } from '@/widgets/addingPostView'
import { PostsList, PublicPostsList } from '@/widgets/postsList'

type Props = {
  id: number
  /**
   * Authorized or Unauthorized
   */
  isPublic: boolean
  post: PublicPost
  posts: GetPublicPostsResponse
  publicUserData: PublicProfile
  userName?: string
}

export const Profile = ({ id, isPublic = false, post, posts, publicUserData, userName }: Props) => {
  const {
    data: userData,
    isError: isUserProfileError,
    isLoading: userProfileLoading,
  } = useFullUserProfileQuery(publicUserData.userName, { skip: isPublic })

  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation()

  if (isUserProfileError) {
    return <p className={'mt-40 text-center text-h1'}>Profile was not found</p>
  }

  // TODO: мерджить стейт с SSR и RTQ;
  // избавиться от публичных приватных постов
  return (
    <div className={'h-full'}>
      {isPublic && publicUserData && <User userData={publicUserData} />}
      {!isPublic && (
        <>
          {!userProfileLoading && userData ? (
            /*todo user date (follovers ect)*/
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
      {/*todo : побліковані фото*/}
      {!isPublic ? (
        <PostsList isFollowing={userData?.isFollowing} post={post} userId={userData?.id || id} />
      ) : (
        <PublicPostsList post={post} posts={posts} userId={id} />
      )}
      <AddingPostView />
    </div>
  )
}
