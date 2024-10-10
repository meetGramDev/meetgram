import { PublicPost } from '@/entities/post'
import { PublicProfile, selectCurrentUser } from '@/entities/user'
import { Profile } from '@/fsd_pages/profile'
import { BASE_URL } from '@/shared/api'
import { useAppSelector } from '@/shared/config/storeHooks'
import { SESSION_COOKIE_NAME } from '@/shared/const/consts'
import { getMainLayout } from '@/widgets/layouts'
import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps = async function (ctx) {
  const params = ctx.params as { userId: string[] }
  const postId = ctx.query?.postId

  if (!params.userId[0]) {
    return {
      notFound: true,
    }
  }

  const resp = await axios.get<PublicProfile>(`${BASE_URL}/public-user/profile/${params.userId[0]}`)

  const cookies = ctx.req.cookies as Record<typeof SESSION_COOKIE_NAME, string | undefined>

  const postRes = await fetch(`${BASE_URL}/public-posts/${postId}`)

  const post = (await postRes.json()) || null

  if (!post) {
    return {
      notFound: true,
    }
  }

  // if (cookies.token) {
  //   const respMe = await axios.get(`${BASE_URL}/auth/me`, {
  //     headers: {
  //       Authorization: `Bearer ${cookies.token}`,
  //     },
  //   })

  //   console.log(respMe.data)
  // }

  console.log(cookies.token)

  return {
    props: {
      isAuth: !!cookies.token,
      publicUserData: resp.data,
      post,
    },
  }
} satisfies GetServerSideProps<{ isAuth: boolean; publicUserData: PublicProfile; post: PublicPost }>

const UserId = ({
  publicUserData,
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const router = useRouter()
  // const userId = router.query.userId as string
  // const {
  //   data: userDataById,
  //   isError: isProfileByIdError,
  //   isLoading: isProfileByIdLoading,
  // } = useGetPublicProfileByIdQuery(userId || skipToken)

  const authUser = useAppSelector(selectCurrentUser)
  // const { data: userData, isLoading: userProfileLoading } = useFullUserProfileQuery(
  //   userDataById?.userName || authUsername || skipToken,
  //   { skip: isProfileByIdError || !authUsername }
  // )

  // if (isProfileByIdError) {
  //   return <p className={'mt-40 text-center text-h1'}>Profile was not found</p>
  // }

  // return (
  //   <div className={'h-full'}>
  //     {(!userProfileLoading || !isProfileByIdLoading) && (userData || userDataById) ? (
  //       <User userData={userData || userDataById} />
  //     ) : (
  //       <UserSkeleton />
  //     )}

  //     <Suspense
  //       fallback={
  //         <div className={'flex justify-center'}>
  //           <Loader />
  //         </div>
  //       }
  //     >
  //       <PostsList userName={userDataById?.userName || authUsername} />
  //     </Suspense>

  //     <AddingPostView />
  //   </div>
  // )

  return authUser.userId
    ? getMainLayout(<Profile post={post} id={authUser.userId} userName={authUser.userName} />)
    : getMainLayout(
        <Profile post={post} id={publicUserData.id} publicUserData={publicUserData} />,
        true
      )
}

// UserId.getLayout = getMainLayout

export default UserId
