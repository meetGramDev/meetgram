import { useMediaQuery } from 'react-responsive'

import { Photo } from '@/entities/photo'
import { FullUserProfile } from '@/entities/user'
import { AddPost } from '@/features/profile/addPost/ui/AddPost'
import notUserPhoto from '@/shared/assets/img/not-photo-user.jpg'
import { PROFILE_SETTINGS } from '@/shared/config/router'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Button } from '@/shared/ui'
import Link from 'next/link'

import s from './User.module.scss'

type Props = {
  userData: FullUserProfile
}

export const User = ({ userData }: Props) => {
  const userPhoto = userData?.avatars.length ? userData.avatars[0] : notUserPhoto
  const t = useTranslate()

  const isMobile = useMediaQuery({ query: '(max-width:650px)' })

  return (
    <div className={s.userWrapper}>
      <div className={s.userData}>
        <Photo
          className={s.userPhoto}
          {...('url' in userPhoto
            ? {
                alt: 'user photo',
                height: userPhoto.height,
                src: userPhoto.url,
                width: userPhoto.width,
              }
            : { alt: 'blank avatar', src: userPhoto })}
        />

        <div className={s.userInformation}>
          {!isMobile && (
            <div className={s.userName}>
              <h1 className={s.userNameTitle}>{userData.userName}</h1>
              <Button as={Link} href={PROFILE_SETTINGS} variant={'secondary'}>
                {t('Profile Settings')}
              </Button>
            </div>
          )}
          <div className={s.buttonPublications}>
            <Link className={s.userLinks} href={'#'}>
              <span>{userData ? userData.followingCount : 0}</span>
              <br />
              {t('Following')}
            </Link>
            <Link className={s.userLinks} href={'#'}>
              <span>{userData ? userData.followersCount : 0}</span>
              <br />
              {t('Followers')}
            </Link>
            <Link className={s.userLinks} href={'#'}>
              <span>{userData ? userData.publicationsCount : 0}</span>
              <br />
              {t('Publications')}
            </Link>
          </div>

          {!isMobile && <div className={s.aboutMeText}>{userData?.aboutMe}</div>}
        </div>
      </div>
      {isMobile && (
        <div className={s.userName}>
          <h1 className={s.userNameTitle}>{userData.userName}</h1>
          <div className={s.aboutMeText}>{userData?.aboutMe}</div>
        </div>
      )}
      <AddPost />
    </div>
  )
}
