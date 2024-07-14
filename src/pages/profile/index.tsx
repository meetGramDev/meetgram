import { useMeQuery, useUserProfileQuery } from '@/entities/user'
import { User } from '@/entities/user/ui/User'
import { getAuthLayout } from '@/widgets/layouts'

function ProfilePage() {
  const { data } = useMeQuery()
  const { data: userData } = useUserProfileQuery()

  console.log(userData)

  return (
    <div>
      {/*<User*/}
      {/*  aboutMe={userData.aboutMe}*/}
      {/*  avatars={userData.avatars}*/}
      {/*  id={userData?.id}*/}
      {/*  userName={userData.userName}*/}
      {/*/>*/}
      Hello, profile
    </div>
  )
}

ProfilePage.getLayout = getAuthLayout

export default ProfilePage
