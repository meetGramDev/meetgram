import { useRef, useState } from 'react'

import { useGetWhoLikedPostQuery } from '@/entities/like'
import { UserItem } from '@/features/pagination/ui/UserItem'
import { useInfiniteScroll } from '@/shared/lib'
import { Loader } from '@/shared/ui'

import s from './UsersListDialog.module.scss'

export type UserListProps = {
  disabled?: boolean
  onFollow?: (id: number) => void
  postId: number
}

const MAX_PAGE_SIZE = 8

export const UsersListDialog = ({ disabled, onFollow, postId }: UserListProps) => {
  const lastUserRef = useRef<HTMLElement>(null)
  const [endCursorId, setEndCursorId] = useState<number | undefined>(undefined)

  const { data, isFetching, isLoading, isSuccess } = useGetWhoLikedPostQuery({
    params: {
      cursor: endCursorId,
      pageSize: MAX_PAGE_SIZE,
    },
    postId,
  })

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
              <UserItem disabled={disabled} key={user.id} onFollow={onFollow} ref={ref} {...user} />

              <li
                className={s.smallLoader}
                key={i + 2}
                style={{ display: data.totalCount === data.items.length ? 'none' : '' }}
              >
                {isFetching && <Loader />}
              </li>
            </>
          )
        }

        return <UserItem disabled={disabled} key={user.id} onFollow={onFollow} {...user} />
      })}
    </ul>
  )
}
