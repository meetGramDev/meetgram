import { ChangeEvent, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { Photo } from '@/entities/photo'
import {
  PublicPost,
  useAddAnswerCommentMutation,
  useAddPostCommentMutation,
  useGetPostCommentsQuery,
  useGetSinglePublicPostQuery,
} from '@/entities/post'
import { selectCurrentUserId } from '@/entities/user'
import { useFollowUserMutation } from '@/features/follow'
import { Comments, getTimeAgo } from '@/features/posts/comments'
import { LikeButton } from '@/features/posts/likePost'
import { PostViewSelect } from '@/features/posts/postViewSelect'
import { CloseIcon, FavoritesIcon, PaperPlane, SketchedFavourites } from '@/shared/assets'
import { HOME } from '@/shared/config/router'
import { useAppSelector } from '@/shared/config/storeHooks'
import { serverErrorHandler } from '@/shared/lib'
import { isErrorMessageString } from '@/shared/types'
import { Button, Dialog, ImageCarousel, Loader, TextArea } from '@/shared/ui'
import { LikesView } from '@/widgets/likesFollowersView'
import Link from 'next/link'
import { useRouter } from 'next/router'

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

export const PostView = ({ isFollowing, isOpen, onEdit, open, postId, userId }: Props) => {
  const { data: post, isLoading: postLoading, isSuccess } = useGetSinglePublicPostQuery(`${postId}`)
  const [addComment] = useAddPostCommentMutation()
  const { data: comments } = useGetPostCommentsQuery({ postId })
  const [addAnswerComment] = useAddAnswerCommentMutation()
  const [isFavourite, setIsFavourite] = useState(false)
  const [textContent, setTextContent] = useState('')
  const [commentId, setCommentId] = useState<null | number>(null)
  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation()

  const answerCommentRef = useRef<HTMLTextAreaElement>(null)

  const tr = useRouter().locale

  const authUserId = useAppSelector(selectCurrentUserId)

  const dateOfCreate = (postCreate: string) => {
    const date = new Date(postCreate)

    return date.toLocaleDateString(tr ?? 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const changeTextAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(e.currentTarget.value)
  }

  const addCommentHandler = () => {
    try {
      setTextContent('')
      if (textContent !== '') {
        addComment({ body: { content: textContent }, postId })
      }
    } catch (err) {
      const message = serverErrorHandler(err)

      if (isErrorMessageString(message)) {
        toast.error(message)
      }
    }
  }

  const addAnswerHandler = (commentId: number) => {
    try {
      setTextContent(`${post?.userName} `)
      if (textContent !== '') {
        addAnswerComment({ body: { content: textContent }, commentId, postId })
        setCommentId(null)
      }
    } catch (err) {
      const message = serverErrorHandler(err)

      if (isErrorMessageString(message)) {
        toast.error(message)
      }
    }
  }

  const publishHandler = () => {
    if (commentId) {
      addAnswerHandler(commentId)
    } else {
      addCommentHandler()
    }
    setTextContent('')
  }

  const answerHandler = (commentId: number) => {
    if (answerCommentRef.current) {
      answerCommentRef.current.focus()
    }
    setTextContent(`${post?.userName} `)
    setCommentId(commentId)
  }

  const handleOnFollow = (userId: number) => followUser({ selectedUserId: userId })

  const ownerProfile = `${HOME}/${userId}`

  if (postLoading) {
    return <Loader loaderClassName={s.loader} />
  }

  return (
    <Dialog onOpenChange={isOpen} open={open}>
      {isSuccess && (
        <div className={s.container}>
          <Button className={s.iconClose} variant={'text'}>
            <CloseIcon
              onClick={() => {
                isOpen(false)
              }}
            />
          </Button>

          <ImageCarousel className={s.post} images={post.images} options={{ align: 'start' }} />

          <div className={s.content}>
            <div className={s.title}>
              <div className={s.userLink}>
                <Link className={s.linkAvatar} href={ownerProfile}>
                  <Photo
                    alt={'Owner avatar'}
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
            </div>
            <div className={s.commentsField}>
              {post.description && (
                <div className={s.description}>
                  <div className={s.descriptionItems}>
                    <Link className={s.descriptionAvatar} href={ownerProfile}>
                      <Photo
                        alt={'Owner avatar'}
                        className={s.avatar}
                        height={36}
                        src={post.avatarOwner || notPhoto}
                        width={36}
                      />
                    </Link>
                    <div className={s.descriptionContent}>
                      <Link className={s.descriptionUserName} href={ownerProfile}>
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
              {comments && <Comments comments={comments} onClick={answerHandler} />}
            </div>
            <div className={s.footer}>
              <div className={s.footerButtons}>
                <div className={s.leftSideButtons}>
                  <LikeButton postId={post.id} />

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
              {!!post.likesCount && (
                <div className={s.postLikes}>
                  <LikesView likesCount={post.likesCount} postId={post.id} />
                </div>
              )}
              <span className={s.date}>{dateOfCreate(post.createdAt)}</span>
            </div>
            <div className={s.commentContainer}>
              <TextArea
                className={s.commentTextArea}
                label={!textContent && 'Add a Comment...'}
                labelClassName={s.label}
                maxLength={500}
                onChange={changeTextAreaHandler}
                ref={answerCommentRef}
                value={textContent}
              />
              <Button className={s.publishButton} onClick={publishHandler} variant={'text'}>
                Publish
              </Button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  )
}
