import { GetPublicPostsResponse } from '@/entities/post'
import { PublicProfile, selectIsUserAuth } from '@/entities/user'
import { Profile } from '@/fsd_pages/profile'
import { BASE_URL } from '@/shared/api'
import { useAppSelector } from '@/shared/config/storeHooks'
import { SESSION_COOKIE_NAME } from '@/shared/const/consts'
import { getMainLayout } from '@/widgets/layouts'
import { PAGE_SIZE, getPublicPosts } from '@/widgets/postsList'
import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps = async function (ctx) {
  const { userId } = ctx.params as { userId: string[] }

  if (!userId || userId[0] === 'undefined') {
    return {
      notFound: true,
    }
  }

  let resp

  try {
    resp = await Promise.all([
      await axios.get<PublicProfile>(`${BASE_URL}/public-user/profile/${userId[0]}`),
      await getPublicPosts({ id: userId[0], params: { pageSize: PAGE_SIZE } }),
    ])
  } catch (e) {
    return {
      notFound: true,
    }
  }

  const cookies = ctx.req.cookies as Record<typeof SESSION_COOKIE_NAME, string | undefined>

  return {
    props: {
      isAuth: cookies.token !== undefined,
      posts: resp[1],
      publicUserData: resp[0].data,
    },
  }
} satisfies GetServerSideProps<{
  isAuth: boolean
  posts: GetPublicPostsResponse
  publicUserData: PublicProfile
}>

const UserId = ({
  isAuth,
  posts,
  publicUserData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const isAuth = useAppSelector(selectIsUserAuth)

  return getMainLayout(
    <Profile
      id={publicUserData.id}
      isPublic={!isAuth}
      posts={posts}
      publicUserData={publicUserData}
    />,
    !isAuth
  )
}

export default UserId
