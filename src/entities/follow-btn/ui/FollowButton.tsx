import { selectCurrentUser } from '@/entities/user'
import { useAppSelector } from '@/shared/config/storeHooks'
import { Button } from '@/shared/ui'

import s from './FollowButton.module.scss'

type Props = {
  disabled?: boolean
  isFollowing: boolean
  onFollow?: (id: number) => void
  userId: number
  // isFollowedBy: boolean
}

export const FollowButton = ({ disabled, isFollowing, onFollow, userId }: Props) => {
  const authUser = useAppSelector(selectCurrentUser)
  const isAuthUser = authUser.userId !== userId

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
