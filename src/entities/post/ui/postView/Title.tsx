import React from 'react'

import { Photo } from '@/entities/photo'
import { PublicPost } from '@/entities/post'
import { selectCurrentUserId, selectIsUserAuth } from '@/entities/user'
import { useFollowUserMutation } from '@/features/follow'
import { PostViewSelect } from '@/features/posts/postViewSelect'
import notPhoto from '@/shared/assets/img/not-photo-user.jpg'
import { HOME } from '@/shared/config/router'
import { useAppSelector } from '@/shared/config/storeHooks'
import { useTranslate } from '@/shared/lib'
import Link from 'next/link'

import s from '@/entities/post/ui/postView/PostView.module.scss'

type Props = {
  isFollowing?: boolean
  isOpen: (open: boolean) => void
  onEdit?: () => void
  post: PublicPost
  postId: number
  userId: number
}
const Title = ({ isFollowing, isOpen, onEdit, post, postId, userId }: Props) => {
  const ownerProfile = `${HOME}/${userId}`
  const t = useTranslate()

  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation()
  const isAuth = useAppSelector(selectIsUserAuth)
  const authUserId = useAppSelector(selectCurrentUserId)
  const handleOnFollow = (userId: number) => followUser({ selectedUserId: userId })

  return (
    <div className={s.title}>
      <div className={s.userLink}>
        {/** photo avatar*/}
        <Link className={s.linkAvatar} href={ownerProfile}>
          <Photo
            alt={t('Owner avatar')}
            className={s.avatar}
            height={36}
            src={post.avatarOwner || notPhoto}
            width={36}
          />
        </Link>
        <Link className={s.link} href={ownerProfile}>
          {post.userName}
        </Link>
      </div>
      {isAuth && (
        <PostViewSelect
          disableFollow={isFollowLoading}
          id={`${postId}`}
          isFollowing={isFollowing}
          onEdit={onEdit}
          onFollow={handleOnFollow}
          onOpenPost={isOpen}
          ownerId={userId}
          userId={authUserId!}
        />
      )}
    </div>
  )
}

export default Title
