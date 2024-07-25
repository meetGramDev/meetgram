import { User, selectCurrentUserName } from '@/entities/user'
import { useAppSelector } from '@/shared/config/storeHooks'
import { getMainLayout } from '@/widgets/layouts/ui/MainLayout'

import s from './index.module.scss'

function Profile() {
  const userName = useAppSelector(selectCurrentUserName)

  const onClickHandler = () => {
    alert('Profile settings clicked')
  }

  return (
    <div className={s.root}>
      {userName && <User onProfileSettingsClicked={onClickHandler} userName={userName} />}
    </div>
  )
}

Profile.getLayout = getMainLayout

export default Profile
