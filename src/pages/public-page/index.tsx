import { useState } from 'react'

import { Photo } from '@/entities/photo'
import { TotalUsersCount } from '@/features/user/totalUsersCount/ui/totalUsersCount'
import { NextPageWithLayout } from '@/shared/types'
import { Button } from '@/shared/ui'
import { getAuthLayout } from '@/widgets/layouts'
import Image from 'next/image'

import s from './index.module.scss'

import notPhotoUser from '../../shared/assets/img/not-photo-user.jpg'

const PublicPage: NextPageWithLayout = () => {
  return (
    <div className={'w-full px-[9.5rem]'}>
      <TotalUsersCount usersCount={12345} />
      <PublicMiniPost />
    </div>
  )
}

PublicPage.getLayout = getAuthLayout

export default PublicPage

const PublicMiniPost = () => {
  const [isExpanted, setIsExpanted] = useState(false)

  const onToggleText = () => {
    setIsExpanted(!isExpanted)
  }

  return (
    <div className={s.publicPostWrapper}>
      <Image alt={'Some photo posts'} height={240} src={notPhotoUser} width={234} />
      <div className={'mt-[12px] flex'}>
        <Photo alt={'Friend avatar'} height={36} src={notPhotoUser} width={36} />
        <h2
          className={'ml-[12px] flex items-center justify-center text-[16px] font-bold leading-6'}
        >
          Friend
        </h2>
      </div>
      <p className={'mb-[3px] mt-[12px] text-[12px] leading-4 text-light-900'}>Created post</p>
      <div className={'inline'}>
        <div className={`${s.publicPost} ${isExpanted ? s.textExpanded : ''}`}>
          {postMessage(
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor incd.mpor incd.mpo.. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit,`,
            92,
            237,
            isExpanted
          )}
          <Button className={'text-[14px]'} onClick={onToggleText} variant={'link'}>
            {isExpanted ? 'Hide' : 'Show more'}
          </Button>
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

  if (messageLength > hideCount && !isExpanted) {
    return <>{`${message.slice(0, hideCount - 9)}... `}</>
  } else if (messageLength < showedCount && isExpanted) {
    return <>{`${message} `}</>
  } else {
    return <>{`${message.slice(0, showedCount - 9)}... `}</>
  }
}
