import { useMeQuery } from '@/entities/user'
import { SelectCurrentUserName } from '@/entities/user/model/selectors/selectCurrentUser'
import { User } from '@/entities/user/ui/User'
import { useAppSelector } from '@/shared/config/storeHooks'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'
import Link from 'next/link'

const Profile: NextPageWithLayout = () => {
  const { data } = useMeQuery()
  const userName = useAppSelector(SelectCurrentUserName)

  const onClickHandler = () => {
    alert('Profile settings clicked')
  }

  return (
    <div>{userName && <User onProfileSettingsClicked={onClickHandler} userName={userName} />}
        <Link href={'/settings'}> Settings</Link>
    </div>
  )
}

Profile.getLayout = getAuthLayout

export default Profile
