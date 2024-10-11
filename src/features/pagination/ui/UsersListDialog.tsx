import { ReactNode, useRef } from 'react'

import { UserItem } from '@/features/pagination/ui/UserItem'
import { useInfiniteScroll } from '@/shared/lib'
import { Loader } from '@/shared/ui'

import s from './UsersListDialog.module.scss'

export type UserListProps = {
  children?: ReactNode
  data: {
    items: any[]
    totalCount: number
  }
  disabled?: boolean
  endCursor: number | undefined
  isFetching: boolean
  isLoading: boolean
  isSuccess: boolean
  maxPageSize?: number
  onDeleteFollowers?: (id: number) => void
  onFollow?: (id: number) => void
  setEndCursor: (cursorId: number | undefined) => void
}

export const UsersListDialog = ({
  data,
  disabled,
  endCursor,
  isFetching,
  isLoading,
  isSuccess,
  maxPageSize = 8,
  onFollow,
  setEndCursor,
}: UserListProps) => {
  const lastUserRef = useRef<HTMLElement>(null)

  const { ref } = useInfiniteScroll(
    () => {
      if (endCursor && data?.items && data.items.length >= maxPageSize) {
        setEndCursor(data.items.at(-1)?.id)
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
