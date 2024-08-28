import { Photo } from '@/entities/photo'
import { Heart } from '@/shared/assets/icons/Heart'
import { SketchedHeart } from '@/shared/assets/icons/SketchedHeart'
import withoutPhoto from '@/shared/assets/img/not-photo-user.jpg'
import { Button } from '@/shared/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Comments.module.scss'

import { getTimeAgo } from '../lib/getTimeAgo'
import { CommentsType } from '../model/types/commentsType'

type Props = {
  comments: CommentsType
}

export const Comments = ({ comments }: Props) => {
  const tr = useRouter().locale

  return (
    <>
      {comments &&
        comments.items.map((comment, index) => (
          <div key={index}>
            <div className={s.commentsContainer}>
              <div className={s.avatars}>
                <Photo
                  alt={'user photo'}
                  height={36}
                  src={comment.from.avatars[0].url || withoutPhoto}
                  width={36}
                />
              </div>
              <div className={s.commentItems}>
                <div className={s.commentContent}>
                  <Link className={s.userName} href={'#'}>
                    {comment.from.username}
                  </Link>
                  {comment.content}
                </div>
                <div className={s.hearts}>
                  <Button className={s.heartButton} variant={'text'}>
                    {comment.isLiked ? <SketchedHeart className={s.heart} /> : <Heart />}
                  </Button>
                </div>
              </div>
            </div>
            <div className={s.commentFooter}>
              <span>{getTimeAgo(tr ?? 'en', comment.createdAt)}</span>
              {comment.isLiked && <span className={s.like}>Like:</span>}
              {comment.likeCount !== 0 && comment.likeCount}
              <Button className={s.button} variant={'text'}>
                Answer
              </Button>
            </div>
          </div>
        ))}
    </>
  )
}
