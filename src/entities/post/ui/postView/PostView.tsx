import { ChangeEvent, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'

import { Photo } from '@/entities/photo'
import { PublicPost, useAddAnswerCommentMutation, useAddPostCommentMutation } from '@/entities/post'
import Footer from '@/entities/post/ui/postView/Footer'
import Title from '@/entities/post/ui/postView/Title'
import { selectIsUserAuth } from '@/entities/user'
import { Comments, getTimeAgo } from '@/features/posts/comments'
import { CloseIcon } from '@/shared/assets'
import { ExpandableText } from '@/shared/components/expandable-text'
import { HOME } from '@/shared/config/router'
import { useAppSelector } from '@/shared/config/storeHooks'
import { serverErrorHandler } from '@/shared/lib'
import { useTranslate } from '@/shared/lib/useTranslate'
import { isErrorMessageString } from '@/shared/types'
import { Button, Dialog, ImageCarousel, TextArea } from '@/shared/ui'
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
  const [addAnswerComment] = useAddAnswerCommentMutation()

  const [textContent, setTextContent] = useState('')
  const [commentId, setCommentId] = useState<null | number>(null)
  const [pageNumber, setPageNumber] = useState(0)
  const answerCommentRef = useRef<HTMLTextAreaElement>(null)

  const locale = useRouter().locale
  const isAuth = useAppSelector(selectIsUserAuth)
  const t = useTranslate()

  const [isExpanded, setIsExpanded] = useState(false)

  const isMobile = useMediaQuery({ query: '(max-width: 40.625rem)' })

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

  const onToggleDescription = () => {
    setIsExpanded(!isExpanded)
  }

  const ownerProfile = `${HOME}/${userId}`

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
            {isMobile && (
              <Title
                isFollowing={isFollowing}
                isOpen={isOpen}
                onEdit={onEdit}
                post={post}
                postId={postId}
                userId={userId}
              />
            )}
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
              {isMobile && <Footer post={post} />}
              {/** header for text area desktop*/}
              {!isMobile && (
                <Title
                  isFollowing={isFollowing}
                  isOpen={isOpen}
                  onEdit={onEdit}
                  post={post}
                  postId={postId}
                  userId={userId}
                />
              )}
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
              {!isMobile && <Footer post={post} />}
              {/**text area*/}

              {isAuth && (
                <div className={s.fix}>
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
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Dialog>
  )
}
