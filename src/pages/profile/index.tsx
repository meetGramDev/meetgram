import { SelectCurrentUserName, User, useGetUserProfileQuery } from '@/entities/user'
import { UploadPhoto, UploadedPhotoType } from '@/features/profile/uploadUserPhoto'
import { useAppSelector } from '@/shared/config/storeHooks'
import { useClientProgress } from '@/shared/lib'
import { getAuthLayout } from '@/widgets/layouts'

function Profile() {
  const { data, isLoading } = useGetUserProfileQuery()
  const userName = useAppSelector(SelectCurrentUserName)

  const profileAvatar: UploadedPhotoType | undefined =
    data && data.avatars.length !== 0
      ? {
          height: data.avatars[0].height,
          url: data.avatars[0].url,
          width: data.avatars[0].width,
        }
      : undefined

  useClientProgress(isLoading)

  const onClickHandler = () => {
    alert('Profile settings clicked')
  }

  return (
    <div>
      {userName && <User onProfileSettingsClicked={onClickHandler} userName={userName} />}
      <UploadPhoto key={data?.avatars.length} profileAvatar={profileAvatar} />
    </div>
  )
}

Profile.getLayout = getAuthLayout

export default Profile
