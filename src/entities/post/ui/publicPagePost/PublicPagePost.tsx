import { useState } from 'react'

import { Photo } from '@/entities/photo'
import { ImageType } from '@/entities/post'
import { Button, ImageCarousel } from '@/shared/ui'
import Image from 'next/image'

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
  const [isExpanted, setIsExpanted] = useState(false)

  const onToggleText = () => {
    setIsExpanted(!isExpanted)
  }

  const createdTime = timeAfterCreatedPost(createdAt)

  return (
    <div className={s.publicPostWrapper}>
      <ImageCarousel
        buttonCarouselClassname={s.buttonCarousel}
        className={s.carouselWrapper}
        contentClassname={s.carouselWrapper}
        images={images}
        itemClassname={s.carouselItem}
      />

      {/*<Image alt={'Some photo posts'} height={240} src={images[0].url} width={234} />*/}
      <div className={'mt-[12px] flex'}>
        <Photo alt={'Friend avatar'} height={36} src={avatarOwner} width={36} />
        <h2
          className={'ml-[12px] flex items-center justify-center text-[16px] font-bold leading-6'}
        >
          {userName}
        </h2>
      </div>
      <p className={'mb-[3px] mt-[12px] text-[12px] leading-4 text-light-900'}>{createdTime}</p>
      <div className={'inline'}>
        <div className={`${s.publicPost} ${isExpanted ? s.textExpanded : ''}`}>
          {postMessage(`${description}`, 100, 237, isExpanted)}
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

//пока что будет просто отображение времени и даты создания поста
const timeAfterCreatedPost = (timeCreatedPostData: string) => {
  const timeCount = timeCreatedPostData.indexOf('T')
  const date = timeCreatedPostData.substring(0, timeCount).split('-').reverse().join('.')
  const time = timeCreatedPostData
    .substring(10)
    .slice(1, -1)
    .split(':')
    .map(t => Math.trunc(Number(t)))
    .join(':')

  return `${time}  ${date}`
}
