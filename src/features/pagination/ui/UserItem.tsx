import { forwardRef } from 'react'

import { FollowButton } from '@/entities/follow-btn'
import { UserLink } from '@/entities/user'
import { FollowLikeItemType } from '@/shared/types'

import s from './UsersListDialog.module.scss'

import { UserListProps } from './UsersListDialog'

type Props = FollowLikeItemType & Partial<UserListProps>

export const UserItem = forwardRef<HTMLLIElement, Props>(
  ({ avatars, disabled, id, isFollowedBy, isFollowing, onFollow, userId, userName }, ref) => {
    return (
      <li className={s.user} key={id} ref={ref}>
        <UserLink avatars={avatars} userId={userId} userName={userName} />
        <div className={'ml-auto'}>
          <FollowButton
            disabled={disabled}
            isFollowing={isFollowing}
            onFollow={onFollow}
            userId={userId}
          />
        </div>
      </li>
    )
  }
)
