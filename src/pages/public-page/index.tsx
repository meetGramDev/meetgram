import { GetPublicPostsResponse } from '@/entities/post'
import { useGetAllPublicPostsQuery } from '@/entities/post/model/services/posts.service'
import { PublicPagePost } from '@/entities/post/ui/publicPagePost/PublicPagePost'
import { TotalUsersCount } from '@/features/user/totalUsersCount/ui/totalUsersCount'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'

import s from './index.module.scss'

// export const getServerSideProps = async () => {
//   const { data: publicPosts } = useGetAllPublicPostsQuery({})
//
//   if (!publicPosts) {
//     return {
//       notFound: true,
//     }
//   }
//
//   return {
//     props: { publicPosts },
//   }
// }

// type PropsType = {
//   data: GetPublicPostsResponse
// }

const PublicPage = () => {
  const { data } = useGetAllPublicPostsQuery({})

  // const { data } = props

  console.log(data)
  // if (!data) {
  //   return <div>hello</div>
  // }

  return (
    <div className={'w-full px-[9.5rem]'}>
      <TotalUsersCount usersCount={data ? data.totalUsers : 0} />
      <div className={s.postWrapper}>
        {data &&
          data.items?.map(item => (
            <PublicPagePost
              avatarOwner={item.avatarOwner}
              createdAt={item.createdAt}
              description={item.description}
              images={item.images}
              key={item.id}
              ownerId={item.ownerId}
              userName={item.userName}
            />
          ))}
      </div>
    </div>
  )
}

PublicPage.getLayout = getAuthLayout

export default PublicPage
