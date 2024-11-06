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

type Props = {
  disabled?: boolean
  likesCount: number
  postId: number
}

const MAX_PAGE_SIZE = 8

export const LikesView = ({ disabled = false, likesCount, postId }: Props) => {
  const [endCursorId, setEndCursorId] = useState<number | undefined>(undefined)

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
        <Button className={s.likeCount} disabled={disabled} variant={'text'}>
          <div className={'flex -space-x-2'}>
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
