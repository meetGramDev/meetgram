import { Button, Photo } from '@/shared/ui'
import { getAuthLayout } from '@/widgets/layouts'
import { useSearchParams } from 'next/navigation'

import s from './Profile.module.scss'

const Profile = () => {
  const params = useSearchParams()

  const name = 'User Name'
  const following: number = 2218
  const followers: number = 2358
  const publications: number = 2764

  return (
    <div className={s.headerWrapper}>
      {/*<Photo alt={'userPhoto'} src={'/'} />*/}
      <div>
        <div>
          <h1>{name}</h1>
          <Button variant={'secondary'}>Profile Settings</Button>
        </div>
        <div>
          <Button variant={'text'}>
            {following}
            <br />
            following
          </Button>
          <Button variant={'text'}>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco <Button variant={'link'}>laboris nisi ut aliquip ex ea commodo consequat.</Button>
        </div>
      </div>
      <div className={s.friendsWrapper}></div>
    </div>
  )
}

Profile.getLayout = getAuthLayout

export default Profile
