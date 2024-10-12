import { ReactNode, useRef } from 'react'

import { useInfiniteScroll } from '@/shared/lib'
import { FollowLikeItemType } from '@/shared/types'
import { Loader } from '@/shared/ui'

import s from './UsersListDialog.module.scss'

import { UserItem } from './UserItem'

export type UserListProps = {
  children?: ReactNode
  data: {
    items: FollowLikeItemType[]
    nextCursor: number
    totalCount: number
  }
  disabled?: boolean
  endCursor: number | undefined
  isFetching: boolean
  isLoading: boolean
  isSuccess: boolean
  maxPageSize?: number
  onDeleteFollowers?: (id: number, userName?: string) => void
  onFollow?: (id: number) => void
  setEndCursor: (cursorId: number | undefined) => void
  totalCount?: number
}

export const UsersListDialog = ({
  data,
  disabled,
  endCursor,
  isFetching,
  isLoading,
  isSuccess,
  maxPageSize = 8,
  onDeleteFollowers,
  onFollow,
  setEndCursor,
  totalCount,
}: UserListProps) => {
  const lastUserRef = useRef<HTMLElement>(null)

  const { ref } = useInfiniteScroll(
    () => {
      if (data?.items && data.items.length >= maxPageSize && totalCount !== data.items.length) {
        setEndCursor(data.nextCursor)
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
              <UserItem
                disabled={disabled}
                key={user.id}
                onDeleteFollowers={onDeleteFollowers}
                onFollow={onFollow}
                ref={ref}
                {...user}
              />

              <li
                className={s.smallLoader}
                key={user.id + 'ldsr'}
                style={{ display: data.totalCount === data.items.length ? 'none' : '' }}
              >
                {isFetching && <Loader />}
              </li>
            </>
          )
        }

        return (
          <UserItem
            disabled={disabled}
            key={user.id}
            onDeleteFollowers={onDeleteFollowers}
            onFollow={onFollow}
            {...user}
          />
        )
      })}
    </ul>
  )
}
