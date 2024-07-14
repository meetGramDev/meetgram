import { useMeQuery } from '@/entities/user'
import { User } from '@/entities/user/ui/User'
import { getAuthLayout } from '@/widgets/layouts'

function ProfilePage() {
  const { data } = useMeQuery()

  return (
    <div>
      <User userName={'Alex'} />
    </div>
  )
}

ProfilePage.getLayout = getAuthLayout

export default ProfilePage
