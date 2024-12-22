import { useEffect, useState } from 'react'

import { Photo } from '@/entities/photo'
import { ImageType } from '@/entities/post'
import { getTimeAgo } from '@/features/posts/comments'
import notUserPhoto from '@/shared/assets/img/not-photo-user.jpg'
import { ExpandableText } from '@/shared/components/expandable-text'
import { HOME } from '@/shared/config/router'
import { Button, ImageCarousel } from '@/shared/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './PublicPagePost.module.scss'

type Props = {
  avatarOwner: string
  createdAt: string
  description: string
  images: ImageType[]
  ownerId: number
  postId: number
  userName: string
}
export const PublicPagePost = ({
  avatarOwner,
  createdAt,
  description,
  images,
  ownerId,
  postId,
  userName,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const tr = useRouter().locale

  const onToggleText = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <main className={s.publicPostWrapper}>
      <ImageCarousel
        btnIconCarousel={s.buttonIconCarousel}
        buttonCarouselClassname={s.buttonWrapperCarousel}
        className={s.carouselWrapper}
        contentClassname={s.carouselWrapper}
        images={images}
        isPictureAsLink
        isPictureAsLinkTo={`${HOME}/${ownerId}?postId=${postId}&isOpenPost=true`}
      />

      <Button
        as={Link}
        className={'flex items-start justify-start text-light-100'}
        href={`${HOME}/${ownerId}`}
        variant={'text'}
      >
        <div className={'mt-[12px] flex'}>
          <Photo alt={'Friend avatar'} height={36} src={avatarOwner || notUserPhoto} width={36} />
          <h2
            className={'ml-[12px] flex items-center justify-center text-[16px] font-bold leading-6'}
          >
            {userName}
          </h2>
        </div>
      </Button>

      <time
        className={'mb-[3px] mt-[12px] text-[12px] leading-4 text-light-900'}
        suppressHydrationWarning
      >
        {getTimeAgo(tr ?? 'en', createdAt)}
      </time>
      <div className={'inline'}>
        <ExpandableText
          cutTextEnd={11}
          hideCount={77}
          isExpanded={isExpanded}
          message={description}
          onExpand={onToggleText}
          showedCount={237}
        />
      </div>
    </main>
  )
}
