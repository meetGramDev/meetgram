import { Photo } from '@/entities/photo'
import { Heart } from '@/shared/assets/icons/Heart'
import { SketchedHeart } from '@/shared/assets/icons/SketchedHeart'
import withoutPhoto from '@/shared/assets/img/not-photo-user.jpg'
import { Button } from '@/shared/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Answers.module.scss'

import { getTimeAgo } from '../../comments/lib/getTimeAgo'
import { AnswersItems } from '../../comments/model/types/answersType'

type Props = {
  answer: AnswersItems
  onClick: () => void
}

export const Answer = ({ answer, onClick }: Props) => {
  const tr = useRouter().locale

  const isAnswer = answer.content.includes(answer.from.username)

  return (
    <div className={s.answerWrapper} key={answer.id}>
      <div className={s.answerContainer}>
        <div className={s.avatars}>
          <Photo
            alt={'user photo'}
            className={s.photo}
            height={36}
            src={answer.from.avatars[0].url || withoutPhoto}
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
          <div className={s.hearts}>
            <Button className={s.heartButton} variant={'text'}>
              {answer.isLiked ? <SketchedHeart className={s.heart} /> : <Heart />}
            </Button>
          </div>
        </div>
      </div>
      <div className={s.answerFooter}>
        <span>{getTimeAgo(tr ?? 'en', answer.createdAt)}</span>
        {answer.isLiked && <span className={s.like}>Like:</span>}
        {answer.likeCount !== 0 && answer.likeCount}
        <Button className={s.button} onClick={onClick} variant={'text'}>
          Answer
        </Button>
      </div>
    </div>
  )
}
