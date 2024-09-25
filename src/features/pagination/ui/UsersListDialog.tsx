import { useRef, useState } from 'react'

import { useGetWhoLikedPostQuery } from '@/entities/like'
import { UserLink } from '@/entities/user'
import { useInfiniteScroll } from '@/shared/lib'
import { Button, Loader } from '@/shared/ui'

import s from './UsersListDialog.module.scss'

type Props = {
  onFollow?: (id: number) => void
  postId: number
}

const MAX_PAGE_SIZE = 8

export const UsersListDialog = ({ onFollow, postId }: Props) => {
  const { data, isFetching, isLoading, isSuccess } = useGetWhoLikedPostQuery({ postId })

  const lastUserRef = useRef<HTMLElement>(null)
  const [endCursorId, setEndCursorId] = useState<number | undefined>(undefined)
  const { ref } = useInfiniteScroll(
    () => {
      if (endCursorId && data?.items && data.items.length >= MAX_PAGE_SIZE) {
        setEndCursorId(data.items.at(-1)?.id)
      }
    },
    {
      root: lastUserRef.current,
      threshold: 1,
    }
  )

  if (isLoading) {
    return <Loader loaderClassName={'mx-auto my-6'} />
  }

  if (!isSuccess) {
    return <div className={'pl-4 font-semibold'}>Error. Data can not be loaded</div>
  }

  return (
    <ul className={s.list}>
      {data.items.map((user, i) => {
        if (data.items.length === i + 1) {
          return (
            <>
              <li className={s.user} key={user.id} ref={ref}>
                <UserLink avatars={user.avatars} userId={user.userId} userName={user.userName} />
                <div className={'ml-auto'}>
                  <Button
                    className={s.followBtn}
                    onClick={() => onFollow?.(user.userId)}
                    variant={user.isFollowing ? 'outlined' : 'primary'}
                  >
                    {user.isFollowing ? 'Unfollow' : 'Follow'}
                  </Button>
                </div>
              </li>

              <li
                className={s.smallLoader}
                style={{ display: data.totalCount === data.items.length ? 'none' : '' }}
              >
                {isFetching && <Loader />}
              </li>
            </>
          )
        }

        return (
          <li className={s.user} key={user.id}>
            <UserLink avatars={user.avatars} userId={user.userId} userName={user.userName} />
            <div className={'ml-auto'}>
              <Button
                className={s.followBtn}
                onClick={() => onFollow?.(user.userId)}
                variant={user.isFollowing ? 'outlined' : 'primary'}
              >
                {user.isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
