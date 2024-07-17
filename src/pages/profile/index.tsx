import { useMeQuery } from '@/entities/user'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'
import Link from 'next/link'

const Profile: NextPageWithLayout = () => {
  const { data } = useMeQuery()

  console.log(data)

  return (
    <div>
      Profile
      <Link href={'/settings'}> Settings</Link>
    </div>
  )
}

Profile.getLayout = getAuthLayout

export default Profile
