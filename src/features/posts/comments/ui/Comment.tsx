import { Photo } from '@/entities/photo'
import {
  useAddLikeToPostCommentMutation,
  useGetAnswerCommentsQuery,
} from '@/entities/post/model/services/post.service'
import { selectIsUserAuth } from '@/entities/user'
import { Heart } from '@/shared/assets/icons/Heart'
import { SketchedHeart } from '@/shared/assets/icons/SketchedHeart'
import withoutPhoto from '@/shared/assets/img/not-photo-user.jpg'
import { useAppSelector } from '@/shared/config/storeHooks'
import { serverErrorHandler } from '@/shared/lib'
import { Button } from '@/shared/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Comments.module.scss'

import { Answers } from '../../answers/ui/Answers'
import { getTimeAgo } from '../lib/getTimeAgo'
import { CommentsItems } from '../model/types/commentsType'

type Props = {
  comment: CommentsItems
  onClick: (commentId: number) => void
}

export const Comment = ({ comment, onClick }: Props) => {
  const tr = useRouter().locale
  const isAuth = useAppSelector(selectIsUserAuth)

  const { data: answers } = useGetAnswerCommentsQuery({
    commentId: comment.id,
    postId: comment.postId,
  })

  const [likeComment] = useAddLikeToPostCommentMutation()

  const setLikeHandler = async (status: string) => {
    try {
      likeComment({
        commentId: comment.id,
        likeStatus: status,
        postId: comment.postId,
      })
    } catch (error) {
      serverErrorHandler(error)
    }
  }

  return (
    <div className={s.isMobile}>
      <div className={s.commentsContainer} key={comment.id}>
        <div className={s.avatars}>
          <Photo
            alt={'user photo'}
            className={s.photo}
            height={36}
            src={comment.from.avatars.length ? comment.from.avatars[0].url : withoutPhoto}
            width={36}
          />
        </div>
        <div className={s.commentItems}>
          <div className={s.commentContent}>
            <Link className={s.userName} href={`/profile/${comment.from.id}`}>
              {comment.from.username}
            </Link>
            {comment.content}
          </div>
          {isAuth && (
            <div className={s.hearts}>
              <Button className={s.heartButton} variant={'text'}>
                {comment.isLiked ? (
                  <SketchedHeart className={s.heart} onClick={() => setLikeHandler('NONE')} />
                ) : (
                  <Heart onClick={() => setLikeHandler('LIKE')} />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className={s.commentFooter}>
        <time>{getTimeAgo(tr ?? 'en', comment.createdAt)}</time>
        {isAuth && (
          <>
            {comment.isLiked && comment.likeCount !== 0 && (
              <span className={s.like}>Like: {comment.likeCount}</span>
            )}
            <Button className={s.button} onClick={() => onClick(comment.id)} variant={'text'}>
              Answer
            </Button>
          </>
        )}
      </div>
      {answers && (
        <Answers answers={answers} onClick={() => onClick(comment.id)} postId={comment.postId} />
      )}
    </div>
  )
}
