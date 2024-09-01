import { ChangeEvent, memo, useState } from 'react'

import { Photo } from '@/entities/photo'
import { Post, PublicPost, useGetSinglePublicPostQuery } from '@/entities/post'
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

type Props = {
  isFollowing: boolean
  isOpen: (open: boolean) => void
  onEdit?: () => void
  open: boolean
  post?: PublicPost
  postId: number
  userId: number
}

export const PostView = memo(({ isFollowing, isOpen, onEdit, open, postId, userId }: Props) => {
  const { data: post, isSuccess } = useGetSinglePublicPostQuery(postId)

  const [isLiked, setIsLiked] = useState(false)
  const [isFavourite, setIsFavourite] = useState(false)
  const [value, setValue] = useState('')
  const dateOfCreate =
    post &&
    new Date(post.createdAt).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

  const changeTextAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value)
  }

  return (
    <Dialog className={s.container} onOpenChange={isOpen} open={open}>
      {isSuccess && (
        <>
          <div className={s.post}>
            <Post
              alt={'post'}
              className={s.post}
              height={post.images[0].height}
              src={post.images[0].url}
              width={post.images[0].width}
            />
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
                  src={post.avatarOwner || notPhoto}
                  width={36}
                />
                {post.userName}
              </Link>
              <div>
                <PostViewSelect
                  id={postId}
                  isFollowing={isFollowing}
                  onEdit={onEdit}
                  ownerId={post.ownerId}
                  userId={userId}
                />
              </div>
            </div>
            <div className={s.commentsField}>
              <div className={s.description}>{post.description}</div>
            </div>
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
              {post.likesCount && (
                <div className={s.postLikes}>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  {post.likesCount} <span className={s.like}>"Like"</span>
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
        </>
      )}
    </Dialog>
  )
})
