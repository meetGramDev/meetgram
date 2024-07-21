import { useMeQuery } from '@/entities/user'
import { SelectCurrentUserName } from '@/entities/user/model/selectors/selectCurrentUser'
import { User } from '@/entities/user/ui/User'
import { useAppSelector } from '@/shared/config/storeHooks'
import { NextPageWithLayout } from '@/shared/types'
import { getMainLayout } from '@/widgets/layouts/ui/MainLayout'

const ProfilePage: NextPageWithLayout = () => {
  const { data } = useMeQuery()
  const userName = useAppSelector(SelectCurrentUserName)

  return <div style={{ margin: '40px 20px' }}>{userName && <User userName={userName} />}</div>
}

ProfilePage.getLayout = getMainLayout

export default ProfilePage
