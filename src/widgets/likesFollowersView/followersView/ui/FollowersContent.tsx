import { useState } from 'react'

import { useFollowUserMutation, useGetUserFollowingOrFollowersQuery } from '@/features/follow'
import { UsersListDialog } from '@/features/pagination'
import { Loader } from '@/shared/ui'

import { ContainerWithSearch } from '../../ui/ContainerWithSearch'
import { FollowersProps } from './FollowersView'

const MAX_PAGE_SIZE = 8

export const FollowersContent = ({ type, userName }: Omit<FollowersProps, 'followCount'>) => {
  const [endCursorId, setEndCursorId] = useState<number | undefined>(undefined)
  const { data, isFetching, isLoading, isSuccess } = useGetUserFollowingOrFollowersQuery({
    cursor: endCursorId,
    isGetFollowers: type === 'followers',
    pageSize: MAX_PAGE_SIZE,
    userName,
  })

  const [follow, { isLoading: isFollowLoading }] = useFollowUserMutation()

  const handleFollowUser = (userId: number) => follow({ selectedUserId: userId })

  return (
    <>
      {!isSuccess ? (
        <div className={'flex items-center justify-center p-12'}>
          <Loader />
        </div>
      ) : (
        <ContainerWithSearch>
          <UsersListDialog
            data={data}
            disabled={isFollowLoading}
            endCursor={endCursorId}
            isFetching={isFetching}
            isLoading={isLoading}
            isSuccess={isSuccess}
            maxPageSize={MAX_PAGE_SIZE}
            onFollow={handleFollowUser}
            setEndCursor={setEndCursorId}
          />
        </ContainerWithSearch>
      )}
    </>
  )
}
