import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { Photo } from '@/entities/photo'
import { Comments } from '@/features/posts/comments'
import { getTimeAgo } from '@/features/posts/comments/lib/getTimeAgo'
import { PostViewSelect } from '@/features/posts/postViewSelect/ui/PostViewSelect'
import { CloseIcon } from '@/shared/assets/icons/CloseIcon'
import { FavoritesIcon } from '@/shared/assets/icons/Favorites'
import { Heart } from '@/shared/assets/icons/Heart'
import { PaperPlane } from '@/shared/assets/icons/PaperPlane'
import { SketchedFavourites } from '@/shared/assets/icons/SketchedFavourites'
import { SketchedHeart } from '@/shared/assets/icons/SketchedHeart'
import { serverErrorHandler } from '@/shared/lib'
import { isErrorMessageString } from '@/shared/types'
import { Button, Dialog, Loader, TextArea } from '@/shared/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './PostView.module.scss'

import notPhoto from '../../../../shared/assets/img/not-photo-user.jpg'
import {
  useAddPostCommentMutation,
  useGetPostCommentsQuery,
  useGetSinglePublicPostQuery,
} from '../../model/services/post.service'
import { PublicPost } from '../../model/types/posts.types'
import { Post } from '../Post'

type Props = {
  isFollowing: boolean
  isOpen: (open: boolean) => void
  onEdit?: () => void
  open: boolean
  post?: PublicPost
  postId: number
  userId: number
}

export const PostView = ({ isFollowing, isOpen, onEdit, open, postId, userId }: Props) => {
  const { data: post, isLoading: postLoading, isSuccess } = useGetSinglePublicPostQuery(postId)
  const [addComment] = useAddPostCommentMutation()
  const { data: comments } = useGetPostCommentsQuery({ postId })

  const [isLiked, setIsLiked] = useState(false)
  const [isFavourite, setIsFavourite] = useState(false)
  const [commentContent, setCommentContent] = useState('')

  const tr = useRouter().locale

  const dateOfCreate = (postCreate: string) => {
    const date = new Date(postCreate)

    return date.toLocaleDateString(tr ?? 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const changeTextAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.currentTarget.value)
  }

  const addCommentHandler = () => {
    try {
      setCommentContent('')
      if (commentContent !== '') {
        addComment({ body: { content: commentContent }, postId })
      }
    } catch (err) {
      const message = serverErrorHandler(err)

      if (isErrorMessageString(message)) {
        toast.error(message)
      }
    }
  }

  if (postLoading) {
    return <Loader loaderClassName={s.loader} />
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
              <div className={s.userLink}>
                <Link className={s.linkAvatar} href={`/profile/${userId}`}>
                  <Photo
                    alt={'Owner avatar'}
                    className={s.avatar}
                    height={36}
                    src={post.avatarOwner || notPhoto}
                    width={36}
                  />
                </Link>
                <Link className={s.link} href={`/profile/${userId}`}>
                  {post.userName}
                </Link>
              </div>
              <PostViewSelect
                id={userId}
                isFollowing={isFollowing}
                onEdit={onEdit}
                ownerId={post.ownerId}
              />
            </div>
            <div className={s.commentsField}>
              {post.description && (
                <div className={s.description}>
                  <div className={s.descriptionItems}>
                    <Link className={s.descriptionAvatar} href={`/profile/${userId}`}>
                      <Photo
                        alt={'Owner avatar'}
                        className={s.avatar}
                        height={36}
                        src={post.avatarOwner || notPhoto}
                        width={36}
                      />
                    </Link>
                    <div className={s.descriptionContent}>
                      <Link className={s.descriptionUserName} href={`/profile/${userId}`}>
                        {post.userName}
                      </Link>
                      {post.description}
                    </div>
                  </div>
                  <span className={s.descriptionDate}>
                    {getTimeAgo(tr ?? 'en', post.updatedAt || post.createdAt)}
                  </span>
                </div>
              )}
              {comments && <Comments comments={comments} />}
            </div>
            <div className={s.footer}>
              <div className={s.footerButtons}>
                <div className={s.leftSideButtons}>
                  <Button
                    className={s.footerButton}
                    onClick={() => {
                      setIsLiked(!isLiked)
                    }}
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
              <div className={s.postLikes}>
                {post.likesCount !== 0 && (
                  <span>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    {post.likesCount} "<span className={s.like}>Like</span>"
                  </span>
                )}
              </div>
              <span className={s.date}>{dateOfCreate(post.createdAt)}</span>
              <div className={s.commentContainer}>
                <TextArea
                  className={s.commentTextArea}
                  label={!commentContent && 'Add a Comment...'}
                  labelClassName={s.label}
                  maxLength={500}
                  onChange={changeTextAreaHandler}
                  value={commentContent}
                />
                <Button className={s.publishButton} onClick={addCommentHandler} variant={'text'}>
                  Publish
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Dialog>
  )
}
