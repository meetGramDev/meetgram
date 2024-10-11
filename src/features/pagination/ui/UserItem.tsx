import { forwardRef } from 'react'

import { UserWhoLikedPost } from '@/entities/like'
import { UserLink, selectCurrentUser } from '@/entities/user'
import { useAppSelector } from '@/shared/config/storeHooks'
import { Button } from '@/shared/ui'

import s from './UsersListDialog.module.scss'

import { UserListProps } from './UsersListDialog'

type Props = Partial<UserListProps> & UserWhoLikedPost

export const UserItem = forwardRef<HTMLLIElement, Props>(
  ({ avatars, disabled, id, isFollowedBy, isFollowing, onFollow, userId, userName }, ref) => {
    const authUser = useAppSelector(selectCurrentUser)
    const isAuthUser = authUser.userId !== userId

    return (
      <li className={s.user} key={id} ref={ref}>
        <UserLink avatars={avatars} userId={userId} userName={userName} />
        <div className={'ml-auto'}>
          {isAuthUser && (
            <Button
              className={s.followBtn}
              disabled={disabled}
              onClick={() => onFollow?.(userId)}
              variant={isFollowing ? 'outlined' : 'primary'}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </div>
      </li>
    )
  }
)
