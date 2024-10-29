import { PublicPost } from '@/entities/post'
import {
  User,
  selectCurrentUserName,
  useFullUserProfileQuery,
  useGetPublicProfileByIdQuery,
} from '@/entities/user'
import { UserSkeleton } from '@/entities/user/ui/skeletons/UserSkeleton'
import { useFollowUserMutation } from '@/features/follow'
import { BASE_URL } from '@/shared/api'
import { useAppSelector } from '@/shared/config/storeHooks'
import { NextPageWithLayout } from '@/shared/types'
import { AddingPostView } from '@/widgets/addingPostView'
import { getMainLayout } from '@/widgets/layouts'
import { PostsList } from '@/widgets/postsList'
import { skipToken } from '@reduxjs/toolkit/query'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'

type ServerSideProps = {
  post: PublicPost
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async context => {
  const postId = context.query?.postId

  const postRes = await fetch(`${BASE_URL}/public-posts/${postId}`)

  const post = (await postRes.json()) || null

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: { post },
  }
}

const UserId: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  post,
}) => {
  const router = useRouter()
  const userId = router.query.userId as string

  const { data: userDataById, isError: isProfileByIdError } = useGetPublicProfileByIdQuery(
    userId || skipToken
  )

  const authUsername = useAppSelector(selectCurrentUserName)
  const {
    data: userData,
    isFetching: userProfileFetching,
    isLoading: userProfileLoading,
  } = useFullUserProfileQuery(userDataById?.userName || authUsername || skipToken, {
    skip: isProfileByIdError,
  })

  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation()

  if (isProfileByIdError) {
    return <p className={'mt-40 text-center text-h1'}>Profile was not found</p>
  }

  return (
    <div className={'h-full'}>
      {!userProfileLoading && userData ? (
        <User
          disabledFollowBtn={isFollowLoading}
          onFollow={userId => followUser({ selectedUserId: userId })}
          userData={userData}
        />
      ) : (
        <UserSkeleton />
      )}
      <PostsList post={post} userName={userDataById?.userName || authUsername} />
      <AddingPostView />
    </div>
  )
}

UserId.getLayout = getMainLayout

export default UserId
