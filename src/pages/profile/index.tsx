import { useMeQuery } from '@/entities/user'
import { NextPageWithLayout } from '@/shared/types'

const Profile: NextPageWithLayout = () => {
  const { data } = useMeQuery()

  console.log(data)

  return <div>Profile</div>
}

export default Profile
