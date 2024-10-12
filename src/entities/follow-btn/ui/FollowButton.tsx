import { useState } from 'react'

import { selectCurrentUser } from '@/entities/user'
import { ConfirmClosingDialog } from '@/features/dialog/confirmClosing'
import { useAppSelector } from '@/shared/config/storeHooks'
import { Button, Dialog } from '@/shared/ui'
import { useRouter } from 'next/router'

import s from './FollowButton.module.scss'

type Props = {
  disabled?: boolean
  isFollowedBy?: boolean
  isFollowing: boolean
  onDeleteFollowers?: (id: number) => void
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
  const isAuthUser = authUser.userId === userId
  const { query } = useRouter()
  const urlID = query.userId as string | undefined
  const isMyPage = urlID && +urlID === authUser.userId

  const [confirmUnfollow, setConfirmUnfollow] = useState(false)
  const [confirmDeleteFollower, setConfirmDeleteFollower] = useState(false)

  const handleOnFollow = () => (isFollowing ? setConfirmUnfollow(true) : onFollow?.(userId))
  const handleOnDelete = () => setConfirmDeleteFollower(true)

  const handleOnConfirm = (isConfirm: boolean, action: 'delete' | 'follow') => {
    switch (action) {
      case 'follow':
        if (isConfirm) {
          onFollow?.(userId)
        }
        setConfirmUnfollow(false)
        break
      case 'delete':
        if (isConfirm) {
          onDeleteFollowers?.(userId)
        }
        setConfirmDeleteFollower(false)
        break
      default:
        setConfirmUnfollow(false)
        setConfirmDeleteFollower(false)
    }
  }

  let content

  if (onDeleteFollowers) {
    content = (
      <div className={s.followersBtn}>
        {!isFollowing && (
          <Button
            className={s.followBtn}
            disabled={disabled}
            onClick={handleOnFollow}
            variant={isFollowing ? 'outlined' : 'primary'}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        )}
        {isMyPage && isFollowedBy && (
          <Button
            className={s.btnFollowerDelete}
            disabled={disabled}
            onClick={handleOnDelete}
            variant={'text'}
          >
            Delete
          </Button>
        )}
      </div>
    )
  } else {
    content = (
      <>
        <Button
          className={s.followBtn}
          disabled={disabled}
          onClick={handleOnFollow}
          variant={isFollowing ? 'outlined' : 'primary'}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      </>
    )
  }

  return (
    <div className={'ml-auto'}>
      {!isAuthUser && content}

      {confirmUnfollow && (
        <Dialog onOpenChange={setConfirmUnfollow} open={confirmUnfollow} title={'Unfollow user'}>
          <ConfirmClosingDialog
            message={`Do you really want to unfollow a "${userName}"?`}
            onConfirm={confirm => handleOnConfirm(confirm, 'follow')}
          />
        </Dialog>
      )}

      {confirmDeleteFollower && (
        <Dialog
          onOpenChange={setConfirmDeleteFollower}
          open={confirmDeleteFollower}
          title={'Delete following'}
        >
          <ConfirmClosingDialog
            message={`Do you really want to delete a following "${userName}"?`}
            onConfirm={confirm => handleOnConfirm(confirm, 'delete')}
          />
        </Dialog>
      )}
    </div>
  )
}
