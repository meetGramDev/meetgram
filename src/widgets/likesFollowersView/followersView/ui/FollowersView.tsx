import { useState } from 'react'

import { useFollowUserMutation, useLazyGetUserFollowingOrFollowersQuery } from '@/features/follow'
import { UsersListDialog } from '@/features/pagination'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Button, Dialog, Loader } from '@/shared/ui'
import { useRouter } from 'next/router'

import s from './FollowersView.module.scss'

import { ContainerWithSearch } from '../../ui/ContainerWithSearch'

type Props = {
  followCount?: number
  type: 'Followers' | 'Following'
  userName: string
}

const MAX_PAGE_SIZE = 8

export const FollowersView = ({ followCount, type, userName }: Props) => {
  const [endCursorId, setEndCursorId] = useState<number | undefined>(undefined)
  const [getFollowingFollowers, { data, isFetching, isLoading, isSuccess }] =
    useLazyGetUserFollowingOrFollowersQuery()

  const [follow, { isLoading: isFollowLoading }] = useFollowUserMutation()

  const t = useTranslate()
  const router = useRouter()
  const isOpen = router.query[type.toLowerCase()] as string | undefined
  const profileUrl = `/profile/${router.query.userId}`

  const handleOpenDialog = (open: boolean) => {
    if (followCount === 0) {
      return
    }

    if (!open) {
      router.push(profileUrl, undefined, { shallow: true })
    } else {
      router.push(`${profileUrl}/?${type.toLowerCase()}`, undefined, {
        shallow: true,
      })
      getFollowingFollowers({
        cursor: endCursorId,
        isGetFollowers: type === 'Followers',
        pageSize: MAX_PAGE_SIZE,
        userName,
      })
    }
  }

  const handleFollowUser = (userId: number) => follow({ selectedUserId: userId })

  return (
    <Dialog
      onOpenChange={handleOpenDialog}
      open={isOpen === '' && followCount !== 0}
      title={t(type) as string}
      trigger={
        <Button className={s.triggerBtn} variant={'text'}>
          <span>{followCount || 0}</span>
          {t(type)}
        </Button>
      }
    >
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
    </Dialog>
  )
}
