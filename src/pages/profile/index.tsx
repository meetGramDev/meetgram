import { useMeQuery } from '@/entities/user'
import { Profile } from '@/entities/user/ui/Profile'
import { getAuthLayout } from '@/widgets/layouts'

function ProfilePage() {
  const { data } = useMeQuery()

  return (
    <div>
      <Profile />
    </div>
  )
}

ProfilePage.getLayout = getAuthLayout

export default ProfilePage
