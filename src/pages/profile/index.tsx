import { useMeQuery } from '@/entities/user'
import { SelectCurrentUserName } from '@/entities/user/model/selectors/selectCurrentUser'
import { User } from '@/entities/user/ui/User'
import { useAppSelector } from '@/shared/config/storeHooks'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'

const Profile: NextPageWithLayout = () => {
  const { data } = useMeQuery()
  const userName = useAppSelector(SelectCurrentUserName)

  return <div>{userName && <User userName={userName} />}</div>
}

Profile.getLayout = getAuthLayout

export default Profile
