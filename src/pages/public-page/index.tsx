import { GetPublicPostsResponse, PublicPost } from '@/entities/post'
import { PublicPagePost } from '@/entities/post/ui/publicPagePost/PublicPagePost'
import { TotalUsersCount } from '@/features/user/totalUsersCount/ui/totalUsersCount'
import { BASE_URL } from '@/shared/api'
import { getAuthLayout } from '@/widgets/layouts'
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
