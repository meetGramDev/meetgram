import { SelectCurrentUserName, User } from '@/entities/user'
import { useAppSelector } from '@/shared/config/storeHooks'
import { getMainLayout } from '@/widgets/layouts/ui/MainLayout'

function Profile() {
  const userName = useAppSelector(SelectCurrentUserName)

  const onClickHandler = () => {
    alert('Profile settings clicked')
  }

  return (
    <div style={{ margin: '40px 20px' }}>
      {userName && <User onProfileSettingsClicked={onClickHandler} userName={userName} />}
    </div>
  )
}

Profile.getLayout = getMainLayout

export default Profile
