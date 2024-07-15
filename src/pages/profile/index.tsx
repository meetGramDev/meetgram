import { useMeQuery, useUserProfileQuery } from '@/entities/user'
import { User } from '@/entities/user/ui/User'
import { useClientProgress } from '@/shared/lib'
import { getAuthLayout } from '@/widgets/layouts'

function ProfilePage() {
  const { data } = useMeQuery()
  const { data: userData, isLoading: isProfileLoading } = useUserProfileQuery()

  console.log(userData)

  useClientProgress(isProfileLoading)

  return (
    <div>
      {userData && (
        <User
          aboutMe={userData?.aboutMe}
          avatars={userData?.avatars}
          id={userData?.id}
          userName={userData?.userName}
        />
      )}
    </div>
  )
}

ProfilePage.getLayout = getAuthLayout

export default ProfilePage
