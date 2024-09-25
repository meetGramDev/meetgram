import { useGetWhoLikedPostQuery } from '@/entities/like'
import { Photo } from '@/entities/photo'
import { UsersListDialog } from '@/features/pagination'
import { SearchDialog } from '@/features/search'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Button, Dialog, Loader } from '@/shared/ui'

import s from './LikesView.module.scss'

type Props = {
  likesCount: number
  postId: number
}

export const LikesView = ({ likesCount, postId }: Props) => {
  const { data, isSuccess } = useGetWhoLikedPostQuery({ postId })

  const t = useTranslate()

  return (
    <Dialog
      title={t('Likes') as string}
      trigger={
        <Button className={s.likeCount} variant={'text'}>
          <div className={'flex -space-x-2'}>
            {data?.items
              .slice(0, 3)
              .map(item => (
                <Photo
                  alt={'user'}
                  height={24}
                  key={item.userId}
                  src={item.avatars[1].url}
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
        <div className={s.container}>
          <SearchDialog />
          <div className={s.content}>
            <UsersListDialog postId={postId} />
          </div>
        </div>
      )}
    </Dialog>
  )
}
