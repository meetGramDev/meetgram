import { memo } from 'react'

import { useGetWhoLikedPostQuery } from '@/entities/like'
import { Photo } from '@/entities/photo'
import { Button, Dialog, Input, Loader } from '@/shared/ui'
import Link from 'next/link'

import s from './LikesView.module.scss'

type Props = {
  likesCount: number
  postId: number
}

export const LikesView = memo(({ likesCount, postId }: Props) => {
  const { data, isSuccess } = useGetWhoLikedPostQuery({ postId })

  return (
    <Dialog
      title={'Likes'}
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
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          {likesCount} "Like"
        </Button>
      }
    >
      {!isSuccess ? (
        <Loader />
      ) : (
        <div className={'m-6 min-h-[30vh] min-w-[60vw]'}>
          <div className={'mb-6'}>
            <Input className={s.search} placeholder={'Search'} type={'text'} />
          </div>
          {data.items.map(item => (
            <div className={'flex w-full items-center'} key={item.userId}>
              <Link className={s.link} href={`/profile/${item.userId}`}>
                <Photo
                  alt={'user'}
                  height={36}
                  src={item.avatars[1].url}
                  variant={'round'}
                  width={36}
                />
                <span className={'text-regular16 font-normal text-light-100'}>{item.userName}</span>
              </Link>
              <div className={'ml-auto'}>
                <Button className={s.followBtn} variant={item.isFollowing ? 'outlined' : 'primary'}>
                  {item.isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Dialog>
  )
})
