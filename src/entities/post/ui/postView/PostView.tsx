import { ChangeEvent, memo, useState } from 'react'

import { Photo } from '@/entities/photo'
import { Post } from '@/entities/post'
import { Comments } from '@/features/posts/comments'
import { PostViewSelect } from '@/features/posts/postViewSelect/ui/PostViewSelect'
import { CloseIcon } from '@/shared/assets/icons/CloseIcon'
import { FavoritesIcon } from '@/shared/assets/icons/Favorites'
import { Heart } from '@/shared/assets/icons/Heart'
import { PaperPlane } from '@/shared/assets/icons/PaperPlane'
import { SketchedFavourites } from '@/shared/assets/icons/SketchedFavourites'
import { SketchedHeart } from '@/shared/assets/icons/SketchedHeart'
import { Button, Dialog, TextArea } from '@/shared/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './PostView.module.scss'

import notPhoto from '../../../../shared/assets/img/not-photo-user.jpg'
import {
  useAddPostCommentMutation,
  useGetPostCommentsQuery,
} from '../../model/services/postView.service'
import { PostViewType } from '../../model/types/postViewTypes'

const PAGE_SIZE = 12
const PAGE_NUMBER = 5

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
    const [addComment] = useAddPostCommentMutation()
    const {
      data: comments,
      isFetching: commentsFetching,
      isLoading: commentsLoading,
    } = useGetPostCommentsQuery({
      params: { pageNumber: PAGE_NUMBER, pageSize: PAGE_SIZE },
      postId: postId,
    })
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
      setCommentContent('')
      if (postId) {
        addComment({ body: { content: commentContent }, postId: postId })
          .unwrap()
          .then(() => {})
          .catch((error: { messages: any[] }) => {
            console.log(error.messages[0])
          })
      }
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
            <div className={s.userLink}>
              <Link className={s.linkAvatar} href={'#'}>
                <Photo
                  alt={'Owner avatar'}
                  className={s.avatar}
                  height={36}
                  src={avatarOwner || notPhoto}
                  width={36}
                />
              </Link>
              <Link className={s.link} href={'#'}>
                {userName}
              </Link>
            </div>
            <div>
              <PostViewSelect id={userId} isFollowing={isFollowing} ownerId={ownerId} />
            </div>
          </div>
          <div className={s.commentsField}>
            {comments && <Comments comments={comments} postId={postId} />}
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
            <div className={s.postLikes}>
              {postLikesCount !== 0 && (
                <span>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  {postLikesCount} "<span className={s.like}>Like</span>"
                </span>
              )}
            </div>
            <div className={s.date}>{dateOfCreate(postCreate)}</div>
          </div>
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
      </Dialog>
    )
  }
)
