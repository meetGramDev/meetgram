import { SelectCurrentUserName, User } from '@/entities/user'
import { useAppSelector } from '@/shared/config/storeHooks'
import { getAuthLayout } from '@/widgets/layouts'

function Profile() {
  const userName = useAppSelector(SelectCurrentUserName)

  const onClickHandler = () => {
    alert('Profile settings clicked')
  }

  return (
    <div>{userName && <User onProfileSettingsClicked={onClickHandler} userName={userName} />}</div>
  )
}

Profile.getLayout = getAuthLayout

export default Profile
