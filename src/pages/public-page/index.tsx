import { GetPublicPostsResponse, PublicPost } from '@/entities/post'
import { useGetAllPublicPostsQuery } from '@/entities/post/model/services/posts.service'
import { PublicPagePost } from '@/entities/post/ui/publicPagePost/PublicPagePost'
import { TotalUsersCount } from '@/features/user/totalUsersCount/ui/totalUsersCount'
import { BASE_URL } from '@/shared/api'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'
import axios from 'axios'
import { GetStaticProps } from 'next'

import s from './index.module.scss'

type PropsType = {
  data: GetPublicPostsResponse
}

//static props
export const getStaticProps: GetStaticProps<PropsType> = async () => {
  const res = await fetch(`${BASE_URL}/public-posts/all/`)
  const data = await res.json()

  const newItems = data.items
  const filteredItems = newItems.filter((item: PublicPost) => item.images.length > 0)

  const newData = {
    ...data,
    items: filteredItems.filter((item: PublicPost, count: number) => count < 4),
  }

  return {
    props: {
      data: newData,
    },
    revalidate: 60,
  }
}

//server side props

// export const getServerSideProps = async () => {
//   const res = await fetch(`${BASE_URL}/public-posts/all/?pageSize=4`)
//   const data = await res.json()
//
//   return {
//     props: {
//       data,
//     },
//   }
// }

const PublicPage = ({ data }: PropsType) => {
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
