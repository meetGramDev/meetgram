import { Heart } from '@/shared/assets/icons/Heart'
import { SketchedHeart } from '@/shared/assets/icons/SketchedHeart'
import { showToastError } from '@/shared/lib'
import { Button } from '@/shared/ui'
import clsx from 'clsx'

import s from './LikeButton.module.scss'

import {
  useGetWhoLikedPostQuery,
  useGiveLikeToPostMutation,
} from '../../../../entities/like/model/service/likeApi.service'

type Props = {
  postId: number
}

export const LikeButton = ({ postId }: Props) => {
  const { data } = useGetWhoLikedPostQuery({ postId })
  const [giveLike, { isLoading: isGivingLike }] = useGiveLikeToPostMutation()

  const handleGiveLike = async () => {
    if (!postId || !data) {
      return
    }

    try {
      await giveLike({
        likeStatus: data.isLiked ? 'NONE' : 'LIKE',
        postId: postId,
      }).unwrap()
    } catch (error) {
      showToastError(error)
    }
  }

  return (
    <Button
      className={clsx(s.likeBtn, isGivingLike && s.disabled, data?.isLiked && s.liked)}
      disabled={isGivingLike}
      onClick={handleGiveLike}
      variant={'text'}
    >
      {data?.isLiked ? (
        <SketchedHeart className={clsx(s.heart, isGivingLike && s.disabled)} />
      ) : (
        <Heart />
      )}
    </Button>
  )
}
