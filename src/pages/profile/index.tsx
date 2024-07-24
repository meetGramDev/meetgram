import { SelectCurrentUserName, User } from '@/entities/user'
import { useAppSelector } from '@/shared/config/storeHooks'
import { getAuthLayout } from '@/widgets/layouts'

function Profile() {
  const userName = useAppSelector(SelectCurrentUserName)

  return <div>{userName && <User userName={userName} />}</div>
}

Profile.getLayout = getAuthLayout

export default Profile
