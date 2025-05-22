import React, { useState } from 'react'

import { PublicPost } from '@/entities/post'
import { selectIsUserAuth } from '@/entities/user'
import { LikeButton } from '@/features/posts/likePost'
import { FavoritesIcon, PaperPlane, SketchedFavourites } from '@/shared/assets'
import { MessengerIcon } from '@/shared/assets/icons/Messenger'
import { useAppSelector } from '@/shared/config/storeHooks'
import { Button } from '@/shared/ui'
import { LikesView } from '@/widgets/likesFollowersView'
import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from '@/entities/post/ui/postView/PostView.module.scss'

type Props = {
  post: PublicPost
}
const Footer = ({ post }: Props) => {
  const isAuth = useAppSelector(selectIsUserAuth)
  const locale = useRouter().locale
  const [isFavourite, setIsFavourite] = useState(false)
  const dateOfCreate = (postCreate: string) => {
    const date = new Date(postCreate)

    return date.toLocaleDateString(locale ?? 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className={s.footer}>
      {isAuth && (
        <div className={s.footerButtons}>
          {/**first 2 button*/}
          <div className={s.leftSideButtons}>
            <LikeButton postId={post.id} />
            <Link href={'#masseges'}>
              <MessengerIcon />
            </Link>
            <Button className={s.footerButton} variant={'text'}>
              <PaperPlane />
            </Button>
          </div>
          {/**Second 1 button*/}
          <Button
            className={s.footerButton}
            onClick={() => {
              setIsFavourite(!isFavourite)
            }}
            variant={'text'}
          >
            {isFavourite ? <SketchedFavourites className={s.favourite} /> : <FavoritesIcon />}
          </Button>
        </div>
      )}
      <div className={clsx(s.postLikes, !isAuth && !post.likesCount && s.withoutLikes)}>
        {!!post.likesCount && (
          <LikesView disabled={!isAuth} likesCount={post.likesCount} postId={post.id} />
        )}
      </div>
      <div className={s.date}>{dateOfCreate(post.createdAt)}</div>
    </div>
  )
}

export default Footer
