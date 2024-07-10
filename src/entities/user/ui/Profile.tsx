import { Button, Photo } from '@/shared/ui'
import { getAuthLayout } from '@/widgets/layouts'
import { useSearchParams } from 'next/navigation'

import s from './Profile.module.scss'

const Profile = () => {
  const params = useSearchParams()

  const name = 'User Name'
  const following = 2218

  return (
    <div className={s.headerWrapper}>
      {/*<Photo alt={'userPhoto'} src={'/'} />*/}
      <div>
        <div>
          <h1>{name}</h1>
          <Button variant={'secondary'}>Profile Settings</Button>
        </div>
        <div>
          <Button variant={'link'}>
            {following}
            <br />
            following
          </Button>
        </div>
      </div>
    </div>
  )
}

Profile.getLayout = getAuthLayout

export default Profile
