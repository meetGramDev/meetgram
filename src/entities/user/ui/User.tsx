import { Photo } from '@/entities/photo'
import { FullUserProfile } from '@/entities/user'
import notUserPhoto from '@/shared/assets/img/not-photo-user.jpg'
import { PROFILE_SETTINGS } from '@/shared/config/router'
import { Button } from '@/shared/ui'
import Link from 'next/link'

import s from './User.module.scss'

type Props = {
  userData: FullUserProfile
}

export const User = ({ userData }: Props) => {
  const userPhoto = userData?.avatars.length ? userData.avatars[0] : notUserPhoto

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
          <div className={s.userName}>
            <h1 className={s.userNameTitle}>{userData.userName}</h1>
            <Button as={Link} href={PROFILE_SETTINGS} variant={'secondary'}>
              Profile Settings
            </Button>
          </div>
          <div className={s.buttonPublications}>
            <Link className={s.userLinks} href={'#'}>
              <span>{userData ? userData.followingCount : 0}</span>
              <br />
              Following
            </Link>
            <Link className={s.userLinks} href={'#'}>
              <span>{userData ? userData.followersCount : 0}</span>
              <br />
              Followers
            </Link>
            <Link className={s.userLinks} href={'#'}>
              <span>{userData ? userData.publicationsCount : 0}</span>
              <br />
              Publications
            </Link>
          </div>
          <div className={s.aboutMeText}>{userData?.aboutMe}</div>
        </div>
      </div>
    </div>
  )
}
