import { useEffect, useState } from 'react'

import { useGetPublicPostsQuery } from '@/entities/post'
import { User, selectCurrentUserName, useFullUserProfileQuery } from '@/entities/user'
import { useAppSelector } from '@/shared/config/storeHooks'
import { useClientProgress } from '@/shared/lib'
import { NextPageWithLayout } from '@/shared/types'
import { getMainLayout } from '@/widgets/layouts/ui/MainLayout/MainLayout'
import { PostsList } from '@/widgets/postsList'
import { skipToken } from '@reduxjs/toolkit/query'
import { useRouter } from 'next/router'

const UserId: NextPageWithLayout = () => {
  const router = useRouter()
  const userName = useAppSelector(selectCurrentUserName)
  const { data: userData, isLoading } = useFullUserProfileQuery(userName || skipToken)

  const userId = router.query.userId

  //
  const pageSize = 12
  const [endCursorPostId, setEndCursorPostId] = useState<number | undefined>(undefined)

  const {
    data: publicPosts,
    isFetching: publicPostsFetching,
    isLoading: publicPostsLoading,
  } = useGetPublicPostsQuery({
    endCursorPostId,
    id: String(userData?.id),
    params: { pageSize },
  })

  useClientProgress(publicPostsFetching)

  const handleFetchNextPosts = () => {
    console.log('Fetching next posts...')
    if (publicPosts?.items.length !== 0) {
      setEndCursorPostId(publicPosts?.items.at(-1)?.id)
    }
  }

  if (isLoading || !userData?.id) {
    return <div>Loading...</div>
  }

  return (
    <div className={'h-full'}>
      <User userData={userData} />
      {publicPosts?.items && publicPosts.items.length !== 0 && (
        <PostsList fetchNextPosts={handleFetchNextPosts} posts={publicPosts?.items} />
      )}
    </div>
  )
}

UserId.getLayout = getMainLayout

export default UserId
