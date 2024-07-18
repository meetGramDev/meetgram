import { useMeQuery } from '@/entities/user'
import { SelectCurrentUserName } from '@/entities/user/model/selectors/selectCurrentUser'
import { User } from '@/entities/user/ui/User'
import { useAppSelector } from '@/shared/config/storeHooks'
import { getAuthLayout } from '@/widgets/layouts'

function ProfilePage() {
  const { data } = useMeQuery()
  const userName = useAppSelector(SelectCurrentUserName)

  const onClickHandler = () => {
    alert('Profile settings clicked')
  }

  return (
    <div>{userName && <User onProfileSettingsClicked={onClickHandler} userName={userName} />}</div>
  )
}

ProfilePage.getLayout = getAuthLayout

export default ProfilePage
