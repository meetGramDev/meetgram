import React from 'react'

import { CopyLinkIcon } from '@/shared/assets/icons/CopyLink'
import { EditIcon } from '@/shared/assets/icons/Edit'
import { FollowIcon } from '@/shared/assets/icons/Follow'
import { MoreIcon } from '@/shared/assets/icons/More'
import { UnfollowIcon } from '@/shared/assets/icons/Unfollow'
import { Wastebasket } from '@/shared/assets/icons/Wastebasket'
import { Button, Select } from '@/shared/ui'

import s from './PostViewSelect.module.scss'

type Props = {
  id: number
  isFollowing: boolean
  ownerId: number
}

export const PostViewSelect = ({ id, isFollowing, ownerId }: Props) => {
  const isOwner = ownerId === id

  return (
    <div>
      <Select
        contentClassName={s.selectContent}
        placeholder={<MoreIcon />}
        rootClassName={s.selectTrigger}
        showArrow={false}
      >
        {isOwner ? (
          <div className={s.menuContent}>
            <Button className={s.button} variant={'text'}>
              <EditIcon /> Edit Post
            </Button>
            <Button className={s.button} variant={'text'}>
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
}
