import { ChangeEvent, ReactNode, memo, useState } from 'react'

import { Photo } from '@/entities/photo'
import { Post } from '@/entities/post'
import { PostViewSelect } from '@/features/posts/postViewSelect/ui/PostViewSelect'
import { CloseIcon } from '@/shared/assets/icons/CloseIcon'
import { FavoritesIcon } from '@/shared/assets/icons/Favorites'
import { Heart } from '@/shared/assets/icons/Heart'
import { PaperPlane } from '@/shared/assets/icons/PaperPlane'
import { SketchedFavourites } from '@/shared/assets/icons/SketchedFavourites'
import { SketchedHeart } from '@/shared/assets/icons/SketchedHeart'
import { Button, Dialog, TextArea } from '@/shared/ui'
import Link from 'next/link'

import s from './PostView.module.scss'

import notPhoto from '../../../../shared/assets/img/not-photo-user.jpg'
import { PostViewType } from '../model/types/postViewTypes'

export const PostView = memo(
  ({
    avatarOwner,
    isFollowing,
    isOpen,
    open,
    ownerId,
    post,
    postCreate,
    postId,
    postLikesCount,
    userId,
    userName,
  }: PostViewType) => {
    const [isLiked, setIsLiked] = useState(false)
    const [isFavourite, setIsFavourite] = useState(false)
    const [value, setValue] = useState('')
    const dateOfCreate = postCreate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    const changeTextAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.currentTarget.value)
    }

    return (
      <Dialog className={s.container} onOpenChange={isOpen} open={open}>
        <div className={s.post}>
          <Post alt={'post'} className={s.post} src={post.src} />
        </div>
        <div className={s.content}>
          <Button className={s.iconClose} variant={'text'}>
            <CloseIcon onClick={() => isOpen(false)} />
          </Button>
          <div className={s.title}>
            <Link className={s.userData} href={'#'}>
              <Photo
                alt={'Owner avatar'}
                className={s.avatar}
                height={36}
                src={avatarOwner || notPhoto}
                width={36}
              />
              {userName}
            </Link>
            <div>
              <PostViewSelect id={userId} isFollowing={isFollowing} ownerId={ownerId} />
            </div>
          </div>
          <div className={s.commentsField}></div>
          <div className={s.footer}>
            <div className={s.footerButtons}>
              <div className={s.leftSideButtons}>
                <Button
                  className={s.footerButton}
                  onClick={() => setIsLiked(!isLiked)}
                  variant={'text'}
                >
                  {isLiked ? <SketchedHeart className={s.heart} /> : <Heart />}
                </Button>
                <Button className={s.footerButton} variant={'text'}>
                  <PaperPlane />
                </Button>
              </div>
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
            {postLikesCount && (
              <div className={s.postLikes}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                {postLikesCount} <span className={s.like}>"Like"</span>
              </div>
            )}
            <span className={s.date}>{dateOfCreate}</span>
          </div>
          <div className={s.commentContainer}>
            <TextArea
              className={s.commentTextArea}
              label={!value && 'Add a Comment...'}
              labelClassName={s.label}
              maxLength={500}
              onChange={changeTextAreaHandler}
              value={value}
            />
            <Button className={s.publishButton} variant={'text'}>
              Publish
            </Button>
          </div>
        </div>
      </Dialog>
    )
  }
)
