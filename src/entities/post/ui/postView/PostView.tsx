import { ChangeEvent, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'

import { Photo } from '@/entities/photo'
import { PublicPost, useAddAnswerCommentMutation, useAddPostCommentMutation } from '@/entities/post'
import { selectCurrentUserId, selectIsUserAuth } from '@/entities/user'
import { useFollowUserMutation } from '@/features/follow'
import { Comments, getTimeAgo } from '@/features/posts/comments'
import { LikeButton } from '@/features/posts/likePost'
import { PostViewSelect } from '@/features/posts/postViewSelect'
import { CloseIcon, FavoritesIcon, PaperPlane, SketchedFavourites } from '@/shared/assets'
import { MessengerIcon } from '@/shared/assets/icons/Messenger'
import { ExpandableText } from '@/shared/components/expandable-text'
import { HOME } from '@/shared/config/router'
import { useAppSelector } from '@/shared/config/storeHooks'
import { serverErrorHandler } from '@/shared/lib'
import { useTranslate } from '@/shared/lib/useTranslate'
import { isErrorMessageString } from '@/shared/types'
import { Button, Dialog, ImageCarousel, TextArea } from '@/shared/ui'
import { LikesView } from '@/widgets/likesFollowersView'
import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './PostView.module.scss'

import notPhoto from '../../../../shared/assets/img/not-photo-user.jpg'

type Props = {
  isFollowing?: boolean
  isOpen: (open: boolean) => void
  onEdit?: () => void
  open: boolean
  post: PublicPost
  postId: number
  userId: number
}

export const PostView = ({ isFollowing, isOpen, onEdit, open, post, postId, userId }: Props) => {
  const [addComment] = useAddPostCommentMutation()
  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation()
  const [addAnswerComment] = useAddAnswerCommentMutation()

  const [isFavourite, setIsFavourite] = useState(false)
  const [textContent, setTextContent] = useState('')
  const [commentId, setCommentId] = useState<null | number>(null)
  const [pageNumber, setPageNumber] = useState(0)
  const answerCommentRef = useRef<HTMLTextAreaElement>(null)

  const locale = useRouter().locale
  const authUserId = useAppSelector(selectCurrentUserId)
  const isAuth = useAppSelector(selectIsUserAuth)
  const t = useTranslate()

  const [isExpanded, setIsExpanded] = useState(false)

  const isMobile = useMediaQuery({ query: '(max-width: 40.625rem)' })

  const dateOfCreate = (postCreate: string) => {
    const date = new Date(postCreate)

    return date.toLocaleDateString(locale ?? 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const changeTextAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(e.currentTarget.value)
  }

  const addCommentHandler = async (pageNumber: number) => {
    try {
      setTextContent('')
      if (textContent !== '') {
        await addComment({ body: { content: textContent }, pageNumber, postId })
      }
    } catch (err) {
      const message = serverErrorHandler(err)

      if (isErrorMessageString(message)) {
        toast.error(message)
      }
    }
  }

  const addAnswerHandler = async (commentId: number) => {
    try {
      setTextContent(`${post?.userName} `)
      if (textContent !== '') {
        await addAnswerComment({ body: { content: textContent }, commentId, postId })
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
      addCommentHandler(pageNumber)
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

  const onToggleDescription = () => {
    setIsExpanded(!isExpanded)
  }

  const ownerProfile = `${HOME}/${userId}`

  const title = (
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

  const footer = (
    <div className={s.footer}>
      {isAuth && (
        <div className={s.footerButtons}>
          {/** first 2 button*/}
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

  return (
    <Dialog className={s.shiftPosition} onOpenChange={isOpen} open={open}>
      <div className={s.mobileBack}>
        {/** if is post open entire post dialog*/}
        {post && (
          <div className={s.container}>
            {/**close cross*/}
            <Button className={s.iconClose} variant={'text'}>
              <CloseIcon
                onClick={() => {
                  isOpen(false)
                }}
              />
            </Button>
            {/** header for text area mobile*/}
            {isMobile && title}
            {/** photo in post*/}
            {post.images && (
              <ImageCarousel
                className={s.post}
                images={post && post?.images}
                options={{ align: 'start' }}
              />
            )}
            {/**whole text area*/}
            <div className={clsx(s.content, !isAuth && s.isNotAuthWidth)}>
              {/**footer for mobile*/}
              {isMobile && footer}
              {/** header for text area desktop*/}
              {!isMobile && title}
              {/**comment text*/}
              <div className={s.commentsField} id={`${postId}`}>
                {post.description && (
                  <div className={s.description}>
                    <div className={s.descriptionItems}>
                      {/** avatar photo for text*/}
                      {!isMobile && (
                        <Link className={s.descriptionAvatar} href={ownerProfile}>
                          <Photo
                            alt={t('Owner avatar')}
                            className={s.avatar}
                            height={36}
                            src={post.avatarOwner || notPhoto}
                            width={36}
                          />
                        </Link>
                      )}
                      <div className={s.descriptionContent}>
                        <Link className={s.descriptionUserName} href={ownerProfile}>
                          {post.userName}
                        </Link>
                        <ExpandableText
                          hideCount={120}
                          isExpanded={isExpanded}
                          message={post.description}
                          onExpand={onToggleDescription}
                          showedCount={post.description.length}
                        />
                      </div>
                    </div>
                    <time className={s.descriptionDate} suppressHydrationWarning>
                      {getTimeAgo(locale ?? 'en', post.updatedAt || post.createdAt)}
                    </time>
                  </div>
                )}
                <Comments
                  onClick={answerHandler}
                  pageNumber={pageNumber}
                  postId={postId}
                  setPageNumber={setPageNumber}
                />
              </div>

              {/**footer*/}
              {!isMobile && footer}
              {/**text area*/}

              {isAuth && (
                <div className={s.commentContainer} id={'masseges'}>
                  <TextArea
                    className={s.commentTextArea}
                    label={!textContent && t('Add a Comment') + '...'}
                    labelClassName={s.label}
                    maxLength={500}
                    onChange={changeTextAreaHandler}
                    ref={answerCommentRef}
                    value={textContent}
                  />
                  <Button className={s.publishButton} onClick={publishHandler} variant={'text'}>
                    {t('Publish')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Dialog>
  )
}
