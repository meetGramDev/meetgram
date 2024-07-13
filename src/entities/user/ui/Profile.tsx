import SignIn from '@/pages/sign-in'
import { Button, Photo } from '@/shared/ui'
import { getAuthLayout } from '@/widgets/layouts'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import s from './Profile.module.scss'

import photo from '../../../shared/assets/img/photo-preview.png'

export const Profile = () => {
  const params = useSearchParams()

  const name = 'User Name'
  const following: number = 2218
  const followers: number = 2358
  const publications: number = 2764

  return (
    <div className={s.profileWrapper}>
      <div className={s.sidebar}>
        <div>Sidebars</div>
      </div>
      <div className={s.scrollingWrapper}>
        <div className={s.personalData}>
          <Photo alt={'userPhoto'} className={s.personalPhoto} src={photo} />
          <div className={s.personalInformation}>
            <div className={s.personalName}>
              <h1 className={s.personalUserName}>{name}</h1>
              <Button variant={'secondary'}>Profile Settings</Button>
            </div>
            <div className={s.buttonPublications}>
              <Button as={Link} className={s.followingBtn} href={'/'} variant={'text'}>
                {following}
                <br />
                following
              </Button>
              <Button as={Link} className={s.followersBtn} href={'/'} variant={'text'}>
                {followers}
                <br />
                followers
              </Button>
              <Button variant={'text'}>
                {publications}
                <br />
                publications
              </Button>
            </div>
            <div>
              <p style={{ wordBreak: 'break-word' }}>
                {publications} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco{' '}
                <Button variant={'link'}>laboris nisi ut aliquip ex ea commodo consequat. </Button>
              </p>
            </div>
          </div>
        </div>
        <div className={s.friendsWrapper}>
          <Photo
            alt={'UserPhoto'}
            height={234}
            src={photo}
            style={{ margin: '12px' }}
            width={228}
          />
          <Photo alt={'UserPhoto'} height={234} src={photo} width={228} />
          <Photo alt={'UserPhoto'} height={234} src={photo} width={228} />
          <Photo alt={'UserPhoto'} height={234} src={photo} width={228} />
          <Photo alt={'UserPhoto'} height={234} src={photo} width={228} />
          <Photo alt={'UserPhoto'} height={234} src={photo} width={228} />
          <Photo alt={'UserPhoto'} height={234} src={photo} width={228} />
          <Photo alt={'UserPhoto'} height={234} src={photo} width={228} />
        </div>
      </div>
    </div>
  )
}
