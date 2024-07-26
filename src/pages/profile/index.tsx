import { User, selectCurrentUserName } from '@/entities/user'
import { useAppSelector } from '@/shared/config/storeHooks'
import { getMainLayout } from '@/widgets/layouts/ui/MainLayout/MainLayout'

function Profile() {
  const userName = useAppSelector(selectCurrentUserName)

  return <User userName={userName} />
}

Profile.getLayout = getMainLayout

export default Profile
