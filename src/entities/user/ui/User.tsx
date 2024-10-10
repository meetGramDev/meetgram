import { useMediaQuery } from 'react-responsive'

import { FollowButton } from '@/entities/follow-btn'
import { Photo } from '@/entities/photo'
import notUserPhoto from '@/shared/assets/img/not-photo-user.jpg'
import { PROFILE_SETTINGS } from '@/shared/config/router'
import { useAppSelector } from '@/shared/config/storeHooks'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Button } from '@/shared/ui'
import { FollowersView } from '@/widgets/likesFollowersView'
import Link from 'next/link'

import s from './User.module.scss'

import { selectCurrentUserId } from '../model/selectors/selectCurrentUser'
import { FullUserProfile, PublicProfile } from '../model/types/services'
import { UserSkeleton } from './skeletons/UserSkeleton'

type Props = {
  disabledFollowBtn?: boolean
  isLoading?: boolean
  onFollow?: (id: number) => void
  userData: FullUserProfile | PublicProfile
}

export const User = ({ disabledFollowBtn, isLoading, onFollow, userData }: Props) => {
  const userPhoto = userData?.avatars.length ? userData.avatars[0] : notUserPhoto
  const t = useTranslate()

  const isMobile = useMediaQuery({ query: '(max-width:650px)' })
  const currentUserId = useAppSelector(selectCurrentUserId)

  if (isLoading) {
    return <UserSkeleton />
  }

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
              {currentUserId === userData.id ? (
                <Button as={Link} href={PROFILE_SETTINGS} variant={'secondary'}>
                  {t('Profile Settings')}
                </Button>
              ) : (
                'isFollowing' in userData && (
                  <div className={s.profileActions}>
                    <FollowButton
                      disabled={disabledFollowBtn}
                      isFollowing={userData.isFollowing}
                      onFollow={onFollow}
                      userId={userData.id}
                    />
                    <Button as={Link} href={'#'} variant={'secondary'}>
                      {t('Send message')}
                    </Button>
                  </div>
                )
              )}
            </div>
          )}
          {'publicationsCount' in userData && (
            <div className={s.buttonPublications}>
              <FollowersView
                followCount={userData.followingCount}
                type={'following'}
                userName={userData.userName}
              />
              <div className={s.userLinks}>
                <span>{userData ? userData.publicationsCount : 0}</span>
                <br />
                {t('Publications')}
              </div>
            </div>
          )}

          {!isMobile && <div className={s.aboutMeText}>{userData?.aboutMe}</div>}
        </div>
      </div>
      {isMobile && (
        <div className={s.userName}>
          <h1 className={s.userNameTitle}>{userData.userName}</h1>
          <div className={s.aboutMeText}>{userData?.aboutMe}</div>
        </div>
      )}
    </div>
  )
}
