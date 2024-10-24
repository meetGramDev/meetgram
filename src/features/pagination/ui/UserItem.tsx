import { forwardRef } from 'react'

import { FollowButton } from '@/entities/follow-btn'
import { UserLink } from '@/entities/user'
import { FollowLikeItemType } from '@/shared/types'

import s from './UsersListDialog.module.scss'

import { UserListProps } from './UsersListDialog'

type Props = FollowLikeItemType & Partial<Omit<UserListProps, 'data'>>

export const UserItem = forwardRef<HTMLLIElement, Props>(
  ({ avatars, id, userId, userName, ...btnFollowProps }, ref) => {
    return (
      <li className={s.user} ref={ref}>
        <UserLink avatars={avatars} userId={userId} userName={userName} />
        <div className={'ml-auto'}>
          <FollowButton userId={userId} userName={userName} {...btnFollowProps} />
        </div>
      </li>
    )
  }
)
