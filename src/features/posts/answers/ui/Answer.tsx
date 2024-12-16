import { Photo } from '@/entities/photo'
import { useAddLikeToPostAnswerMutation } from '@/entities/post/model/services/post.service'
import { AnswersItems } from '@/entities/post/model/types/answersType'
import { selectIsUserAuth } from '@/entities/user'
import { Heart } from '@/shared/assets/icons/Heart'
import { SketchedHeart } from '@/shared/assets/icons/SketchedHeart'
import withoutPhoto from '@/shared/assets/img/not-photo-user.jpg'
import { useAppSelector } from '@/shared/config/storeHooks'
import { serverErrorHandler } from '@/shared/lib/errorHandlers'
import { Button } from '@/shared/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Answers.module.scss'

import { getTimeAgo } from '../../comments/lib/getTimeAgo'

type Props = {
  answer: AnswersItems
  onClick: () => void
  postId: number
}

export const Answer = ({ answer, onClick, postId }: Props) => {
  const tr = useRouter().locale
  const [likeAnswer] = useAddLikeToPostAnswerMutation()

  const isAuth = useAppSelector(selectIsUserAuth)
  const isAnswer = answer.content.includes(answer.from.username)
  const setLikeHandler = async (status: string) => {
    try {
      likeAnswer({
        answerId: answer.id,
        commentId: answer.commentId,
        likeStatus: status,
        postId,
      })
    } catch (error) {
      serverErrorHandler(error)
    }
  }

  return (
    <div className={s.answerWrapper} key={answer.id}>
      <div className={s.answerContainer}>
        <div className={s.avatars}>
          <Photo
            alt={'user photo'}
            className={s.photo}
            height={36}
            src={answer.from.avatars.length ? answer.from.avatars[0].url : withoutPhoto}
            width={36}
          />
        </div>
        <div className={s.answerItems}>
          <div className={s.answerContent}>
            <Link className={s.userName} href={`/profile/${answer.from.id}`}>
              {answer.from.username}
            </Link>
            {isAnswer ? (
              <>
                <strong>{answer.from.username} </strong>
                <span>{answer.content.replace(answer.from.username, '')}</span>
              </>
            ) : (
              <span> {answer.content}</span>
            )}
          </div>
          {isAuth && (
            <div className={s.hearts}>
              <Button className={s.heartButton} variant={'text'}>
                {answer.isLiked ? (
                  <SketchedHeart className={s.heart} onClick={() => setLikeHandler('DISLIKE')} />
                ) : (
                  <Heart onClick={() => setLikeHandler('LIKE')} />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className={s.answerFooter}>
        <span>{getTimeAgo(tr ?? 'en', answer.createdAt)}</span>
        {isAuth && (
          <>
            {answer.isLiked && answer.likeCount !== 0 && (
              <span className={s.like}>Like: {answer.likeCount}</span>
            )}
            <Button className={s.button} onClick={onClick} variant={'text'}>
              Answer
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
