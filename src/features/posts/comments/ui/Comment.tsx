import { Photo } from '@/entities/photo'
import {
  useAddLikeToPostCommentMutation,
  useGetAnswerCommentsQuery,
} from '@/entities/post/model/services/post.service'
import { Heart } from '@/shared/assets/icons/Heart'
import { SketchedHeart } from '@/shared/assets/icons/SketchedHeart'
import withoutPhoto from '@/shared/assets/img/not-photo-user.jpg'
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

  const { data: answers } = useGetAnswerCommentsQuery({
    commentId: comment.id,
    postId: comment.postId,
  })

  const [likeComment] = useAddLikeToPostCommentMutation()

  const addLikeToComment = async () => {
    try {
      if (!comment.isLiked) {
        likeComment({ commentId: comment.id, likeStatus: 'LIKE', postId: comment.postId })
      }
    } catch (error) {
      serverErrorHandler(error)
    }
  }

  return (
    <>
      <div key={comment.id}>
        <div className={s.commentsContainer}>
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
            <div className={s.hearts}>
              <Button className={s.heartButton} onClick={addLikeToComment} variant={'text'}>
                {comment.isLiked ? <SketchedHeart className={s.heart} /> : <Heart />}
              </Button>
            </div>
          </div>
        </div>
        <div className={s.commentFooter}>
          <span>{getTimeAgo(tr ?? 'en', comment.createdAt)}</span>
          {comment.isLiked && <span className={s.like}>Like:</span>}
          {comment.likeCount !== 0 && comment.likeCount}
          <Button className={s.button} onClick={() => onClick(comment.id)} variant={'text'}>
            Answer
          </Button>
        </div>
        {answers && (
          <Answers answers={answers} onClick={() => onClick(comment.id)} postId={comment.postId} />
        )}
      </div>
    </>
  )
}
