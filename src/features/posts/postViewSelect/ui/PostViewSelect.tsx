import React, { memo, useState } from 'react'

import { useDeletePostMutation } from '@/entities/post/model/services/post.service'
import { CopyLinkIcon } from '@/shared/assets/icons/CopyLink'
import { EditIcon } from '@/shared/assets/icons/Edit'
import { FollowIcon } from '@/shared/assets/icons/Follow'
import { MoreIcon } from '@/shared/assets/icons/More'
import { UnfollowIcon } from '@/shared/assets/icons/Unfollow'
import { Wastebasket } from '@/shared/assets/icons/Wastebasket'
import { Button, Dialog, Select } from '@/shared/ui'
import { clsx } from 'clsx'

import s from './PostViewSelect.module.scss'

type Props = {
  id: number
  isFollowing: boolean
  onEdit?: () => void
  ownerId: number
  userId: number
}

export const PostViewSelect = memo(({ id, isFollowing, onEdit, ownerId, userId }: Props) => {
  const [deletePost, {}] = useDeletePostMutation()
  const isOwner = ownerId === id

  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <div>
      <Select
        contentClassName={s.selectContent}
        placeholder={<MoreIcon />}
        rootClassName={s.selectTrigger}
        showArrow={false}
      >
        {openModal && (
          <Dialog onOpenChange={setOpenModal} open={openModal} title={'Delete Post'}>
            <div className={s.dialogChildrenWrapper}>
              <span className={s.dialogText}>{`Are you sure you want to
delete this post?`}</span>
              <div className={s.dialogBtnWrap}>
                <Button
                  className={clsx(s.dialogButton, s.dialogButtonComplete)}
                  onClick={() => {
                    deletePost({ postId: id })
                    setOpenModal(false)
                  }}
                  variant={'outlined'}
                >
                  Yes
                </Button>
                <Button
                  className={s.dialogButton}
                  onClick={() => setOpenModal(false)}
                  variant={'primary'}
                >
                  No
                </Button>
              </div>
            </div>
          </Dialog>
        )}
        {isOwner ? (
          <div className={s.menuContent}>
            <Button className={s.button} onClick={onEdit} variant={'text'}>
              <EditIcon /> Edit Post
            </Button>
            <Button className={s.button} onClick={() => setOpenModal(true)} variant={'text'}>
              <Wastebasket /> Delete Post
            </Button>
          </div>
        ) : (
          <div className={s.menuContent}>
            {isFollowing ? (
              <Button className={s.button} variant={'text'}>
                <UnfollowIcon /> Unfollow
              </Button>
            ) : (
              <Button className={s.button} variant={'text'}>
                <FollowIcon /> Follow
              </Button>
            )}
            <Button className={s.button} variant={'text'}>
              <CopyLinkIcon /> Copy Link
            </Button>
          </div>
        )}
      </Select>
    </div>
  )
})

PostViewSelect.displayName = 'PostViewSelect'
