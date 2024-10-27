import { useState } from 'react'

import { Photo } from '@/entities/photo'
import { ImageType, getPostMessage } from '@/entities/post'
import { getTimeAgo } from '@/features/posts/comments'
import { HOME } from '@/shared/config/router'
import { Button, ImageCarousel } from '@/shared/ui'
import clsx from 'clsx'
import Link from 'next/link'
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
  const [isExpanted, setIsExpanted] = useState(false)

  const onToggleText = () => {
    setIsExpanted(!isExpanted)
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
        as={Link}
        className={'flex items-start justify-start text-light-100'}
        href={`${HOME}/${ownerId}`}
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
        <div className={clsx(s.publicPost, isExpanted ? s.textExpanded : '')}>
          <> {getPostMessage(`${description}`, 77, 237, isExpanted)}</>
          {description.length > 77 && (
            <Button className={'text-[14px]'} onClick={onToggleText} variant={'link'}>
              {isExpanted ? 'Hide' : 'Show more'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
