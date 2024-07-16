import { useCallback } from 'react'

import { useFullUserProfileQuery, useMeQuery } from '@/entities/user'
import { User } from '@/entities/user/ui/User'
import { useClientProgress } from '@/shared/lib'
import { getAuthLayout } from '@/widgets/layouts'

function ProfilePage() {
  const { data } = useMeQuery()

  const { data: userData, isLoading: isFollowing } = useFullUserProfileQuery({
    userName: data !== undefined ? data?.userName : '',
  })

  const onClickHandler = () => {
    alert('Profile settings clicked')
  }

  useClientProgress(isFollowing)

  return (
    <div>
      {userData && (
        <User
          aboutMe={userData.aboutMe}
          avatars={userData.avatars}
          followersCount={userData.followersCount}
          followingCount={userData.followingCount}
          id={userData.id}
          onProfileSettingsClicked={onClickHandler}
          publicationsCount={userData.publicationsCount}
          userName={userData.userName}
        />
      )}
    </div>
  )
}

ProfilePage.getLayout = getAuthLayout

export default ProfilePage
