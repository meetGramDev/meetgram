import { useGetUserProfileQuery } from '@/entities/user'
import { UploadPhoto, UploadedPhotoType } from '@/features/profile/uploadUserPhoto'
import { useClientProgress } from '@/shared/lib'

export default function Settings() {
  const { data, isLoading } = useGetUserProfileQuery()
  const profileAvatar: UploadedPhotoType | undefined =
    data && data.avatars.length !== 0
      ? {
          height: data.avatars[0].height,
          url: data.avatars[0].url,
          width: data.avatars[0].width,
        }
      : undefined

  useClientProgress(isLoading)

  return (
    <div>
      <UploadPhoto key={data?.avatars.length} profileAvatar={profileAvatar} />
    </div>
  )
}
