import { GetPublicPostsResponse, PublicPost } from '@/entities/post'
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
  const postId = ctx.query?.postId

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

  const postRes = await fetch(`${BASE_URL}/public-posts/${postId}`)

  const post = (await postRes.json()) || null

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      isAuth: cookies.token !== undefined,
      post,
      posts: resp[1],
      publicUserData: resp[0].data,
    },
  }
} satisfies GetServerSideProps<{
  isAuth: boolean
  post: PublicPost
  posts: GetPublicPostsResponse
  publicUserData: PublicProfile
}>

const UserId = ({
  isAuth,
  post,
  posts,
  publicUserData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const isAuth = useAppSelector(selectIsUserAuth)

  return getMainLayout(
    <Profile
      id={publicUserData.id}
      isPublic={!isAuth}
      post={post}
      posts={posts}
      publicUserData={publicUserData}
    />,
    !isAuth
  )
}

export default UserId
