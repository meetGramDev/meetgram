import { Photo } from '@/entities/photo'
import { TotalUsersCount } from '@/features/user/totalUsersCount/ui/totalUsersCount'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'
import Image from 'next/image'

import s from './index.module.scss'

import notPhotoUser from '../../shared/assets/img/not-photo-user.jpg'

const PublicPage: NextPageWithLayout = () => {
  return (
    <div className={'px-[9.5rem]'}>
      <TotalUsersCount usersCount={12345} />
      Public pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic
      pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic
      pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic page
      <PublicMiniPost />
    </div>
  )
}

PublicPage.getLayout = getAuthLayout

export default PublicPage

const PublicMiniPost = () => {
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
      <p className={'mt-[12px] text-[12px] leading-4'}>Created post</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing
        elit, sed do eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do
        eiusmod tempor incd.mpor incd.mpor incd.mpo.. Hide{' '}
      </p>
    </div>
  )
}
