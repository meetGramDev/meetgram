import { useMeQuery } from '@/entities/user'

const Profile = () => {
  const { data } = useMeQuery()

  console.log(data)

  return <div>Profile</div>
}

export default Profile
