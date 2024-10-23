import { useState } from 'react'

import { Photo } from '@/entities/photo'
import { ImageType } from '@/entities/post'
import { getTimeAgo } from '@/features/posts/comments'
import { Button, ImageCarousel } from '@/shared/ui'
import { useRouter } from 'next/router'

import s from './PublicPagePost.module.scss'

type Props = {
  avatarOwner: string
  createdAt: string
  description: string
  images: ImageType[]
  ownerId: number
  userName: string
}
export const PublicPagePost = ({
  avatarOwner,
  createdAt,
  description,
  images,
  ownerId,
  userName,
}: Props) => {
  const tr = useRouter().locale
  const router = useRouter()
  const [isExpanted, setIsExpanted] = useState(false)

  const onToggleText = () => {
    setIsExpanted(!isExpanted)
  }
  const onUserPageHandler = () => {
    router.push(`/profile/${ownerId}`)
  }

  return (
    <div className={s.publicPostWrapper}>
      <ImageCarousel
        btnIconCarousel={s.buttonIconCarousel}
        buttonCarouselClassname={s.buttonWrapperCarousel}
        className={s.carouselWrapper}
        contentClassname={s.carouselWrapper}
        images={images}
        // itemClassname={s.carouselItem}
      />
      <Button
        className={'flex items-start justify-start text-light-100'}
        onClick={onUserPageHandler}
        variant={'text'}
      >
        <div className={'mt-[12px] flex'}>
          <Photo alt={'Friend avatar'} height={36} src={avatarOwner} width={36} />
          <h2
            className={'ml-[12px] flex items-center justify-center text-[16px] font-bold leading-6'}
          >
            {userName}
          </h2>
        </div>
      </Button>

      <p className={'mb-[3px] mt-[12px] text-[12px] leading-4 text-light-900'}>
        {getTimeAgo(tr ?? 'en', createdAt)}
      </p>
      <div className={'inline'}>
        <div className={`${s.publicPost} ${isExpanted ? s.textExpanded : ''}`}>
          {postMessage(`${description}`, 90, 237, isExpanted)}
          {description.length === 0 || description.length < 93 ? (
            <></>
          ) : (
            <Button className={'text-[14px]'} onClick={onToggleText} variant={'link'}>
              {isExpanted ? 'Hide' : 'Show more'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

const postMessage = (
  message: string,
  hideCount: number,
  showedCount: number,
  isExpanted: boolean
) => {
  const messageLength = message.length

  if (messageLength === 0) {
    return <></>
  } else if (messageLength < showedCount) {
    return <>{`${message} `}</>
  } else if (messageLength > hideCount && !isExpanted) {
    return <>{`${message.slice(0, hideCount - 11)}... `}</>
  } else if (messageLength > showedCount && isExpanted) {
    return <>{`${message.slice(0, showedCount - 11)}... `}</>
  }
}
