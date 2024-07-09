import { Photo } from '@/shared/ui'
import { getAuthLayout } from '@/widgets/layouts'
import { useSearchParams } from 'next/navigation'

import s from './Profile.module.scss'

const Profile = () => {
  const params = useSearchParams()

  return (
    <div className={s.headerWrapper}>
      <Photo alt={'userPhoto'} src={'/'} />
      <div></div>
    </div>
  )
}

Profile.getLayout = getAuthLayout

export default Profile
