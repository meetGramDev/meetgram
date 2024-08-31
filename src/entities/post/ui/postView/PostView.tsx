import { ChangeEvent, useEffect, useState } from 'react'

import { Photo } from '@/entities/photo'
import { Post, PublicPost, useGetSinglePublicPostQuery } from '@/entities/post'
import { Comments } from '@/features/posts/comments'
import { CommentsItems, CommentsType } from '@/features/posts/comments/model/types/commentsType'
import { PostViewSelect } from '@/features/posts/postViewSelect/ui/PostViewSelect'
import { CloseIcon } from '@/shared/assets/icons/CloseIcon'
import { FavoritesIcon } from '@/shared/assets/icons/Favorites'
import { Heart } from '@/shared/assets/icons/Heart'
import { PaperPlane } from '@/shared/assets/icons/PaperPlane'
import { SketchedFavourites } from '@/shared/assets/icons/SketchedFavourites'
import { SketchedHeart } from '@/shared/assets/icons/SketchedHeart'
import { useInfiniteScroll } from '@/shared/lib'
import { Button, Dialog, TextArea } from '@/shared/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './PostView.module.scss'

import notPhoto from '../../../../shared/assets/img/not-photo-user.jpg'
import {
  useAddPostCommentMutation,
  useGetPostCommentsQuery,
} from '../../model/services/postView.service'

const PAGE_SIZE = 10
const PAGE_NUMBER = 1

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
  const { data: post, isSuccess } = useGetSinglePublicPostQuery(postId)
  const [addComment] = useAddPostCommentMutation()
  const [pageNumber, setPageNumber] = useState(1)
  const {
    data: comments,
    isFetching: commentsFetching,
    isLoading: commentsLoading,
  } = useGetPostCommentsQuery({
    params: { pageNumber, pageSize: PAGE_SIZE },
    postId,
  })

  const [isLiked, setIsLiked] = useState(false)
  const [isFavourite, setIsFavourite] = useState(false)
  const [commentContent, setCommentContent] = useState('')
  const [items, setItems] = useState<CommentsItems[]>([])

  const tr = useRouter().locale

  useEffect(() => {
    if (comments?.items) {
      setItems(prev => [...prev, ...comments.items])
    }
  }, [comments])

  const { ref, scroll } = useInfiniteScroll(() => {
    if (comments?.items && comments.items.length >= PAGE_SIZE) {
      setPageNumber(prevPage => prevPage + 1)
    }
  })

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
      addComment({ body: { content: commentContent }, postId })
        .unwrap()
        .then(() => {})
        .catch((error: { messages: any[] }) => {
          console.log(error.messages[0])
        })
    }
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
                    <Link className={s.descriptionUserName} href={'#'}>
                      {post.userName}
                    </Link>
                    {post.description}
                  </div>
                </div>
              )}
              {comments && <Comments items={items} />}
              {commentsLoading || (commentsFetching && <p>Загрузка...</p>)}
              <div ref={ref} style={{ height: '20px' }} />
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
                <Button
                  className={s.publishButton}
                  disabled={commentsFetching}
                  onClick={addCommentHandler}
                  variant={'text'}
                >
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
