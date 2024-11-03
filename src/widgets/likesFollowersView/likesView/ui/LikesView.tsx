import { useState } from 'react'

import { useGetWhoLikedPostQuery } from '@/entities/like'
import { Photo } from '@/entities/photo'
import { useFollowUserMutation } from '@/features/follow'
import { UsersListDialog } from '@/features/pagination'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Button, Dialog, Loader } from '@/shared/ui'

import s from './LikesView.module.scss'

import noPhoto from '../../../../shared/assets/img/not-photo-user.jpg'
import { ContainerWithSearch } from '../../ui/ContainerWithSearch'
import { useAppSelector } from '@/shared/config/storeHooks'
import { selectIsUserAuth } from '@/entities/user'
import { clsx } from 'clsx'

type Props = {
  likesCount: number
  postId: number
}

const MAX_PAGE_SIZE = 8

export const LikesView = ({ likesCount, postId }: Props) => {
  const [endCursorId, setEndCursorId] = useState<number | undefined>(undefined)
  const isAuth = useAppSelector(selectIsUserAuth)

  const { data, isFetching, isLoading, isSuccess } = useGetWhoLikedPostQuery({
    cursor: endCursorId,
    pageSize: MAX_PAGE_SIZE,
    postId,
  })

  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation()

  const t = useTranslate()

  const handleFollowUser = (userId: number) => followUser({ selectedUserId: userId })

  return (
    <Dialog
      title={t('Likes') as string}
      trigger={
        <Button
          className={clsx(s.likeCount, !isAuth && s.disabledButton)}
          variant={'text'}
          disabled={!isAuth}
        >
          <div className={clsx('flex -space-x-2', !isAuth && '-ml-3.5')}>
            {data?.items
              .slice(0, 3)
              .map(item => (
                <Photo
                  alt={'user'}
                  height={24}
                  key={item.userId}
                  src={item.avatars.length ? item.avatars[1].url : noPhoto}
                  variant={'round'}
                  width={24}
                />
              ))}
          </div>
          {likesCount + ' ' + t('Like')}
        </Button>
      }
    >
      {!isSuccess ? (
        <Loader />
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
