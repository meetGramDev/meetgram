import { selectCurrentUser } from '@/entities/user'
import { useAppSelector } from '@/shared/config/storeHooks'
import { Button } from '@/shared/ui'

import s from './FollowButton.module.scss'

type Props = {
  disabled?: boolean
  isFollowedBy?: boolean
  isFollowing: boolean
  onDeleteFollowers?: (id: number, userName?: string) => void
  onFollow?: (id: number) => void
  userId: number
  userName?: string
}

export const FollowButton = ({
  disabled,
  isFollowedBy,
  isFollowing,
  onDeleteFollowers,
  onFollow,
  userId,
  userName,
}: Props) => {
  const authUser = useAppSelector(selectCurrentUser)
  const isAuthUser = authUser.userId !== userId

  if (onDeleteFollowers) {
    return (
      <div className={'ml-auto'}>
        {isAuthUser && (
          <div className={s.followersBtn}>
            {!isFollowing && (
              <Button
                className={s.followBtn}
                disabled={disabled}
                onClick={() => onFollow?.(userId)}
                variant={isFollowing ? 'outlined' : 'primary'}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            )}
            {isFollowedBy && (
              <Button
                className={s.btnFollowerDelete}
                disabled={disabled}
                onClick={() => onDeleteFollowers?.(userId, userName)}
                variant={'text'}
              >
                Delete
              </Button>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
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
  )
}
