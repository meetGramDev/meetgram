import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'

import { UploadPhoto, UploadedPhotoType } from '@/features/profile/uploadUserPhoto'
import {
  FormSkeleton,
  PhotoSkeleton,
  UserSettingsForm,
  UserSettingsFormData,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/features/profile/userSettings'
import { ServerMessagesType } from '@/shared/api'
import { serverErrorHandler, useClientProgress } from '@/shared/lib'
import { isErrorServerMessagesType } from '@/shared/types'

import s from './UserSettings.module.scss'

export const UserSettings = () => {
  const isMobile = useMediaQuery({ query: '(max-width:650px)' })

  const { data, isLoading: getProfileLoading } = useGetProfileQuery()
  const [error, setError] = useState<ServerMessagesType[]>([])

  const [updateProfile, { isLoading: updateProfileLoading }] = useUpdateProfileMutation()

  useClientProgress(getProfileLoading || updateProfileLoading)

  const profileAvatar: UploadedPhotoType | undefined =
    data && data.avatars.length !== 0
      ? {
          height: data.avatars[0].height,
          url: data.avatars[0].url,
          width: data.avatars[0].width,
        }
      : undefined

  const updateProfileData = async (data: UserSettingsFormData) => {
    try {
      for (const key in data) {
        if (key === 'dateOfBirth' && data[key] === '') {
          delete data[key]
        }
      }

      await updateProfile(data).unwrap()
      toast.success('Profile has successfully updated')
    } catch (e) {
      const err = serverErrorHandler(e)

      if (isErrorServerMessagesType(err)) {
        setError(err)
      }
    }
  }

  return (
    <div className={!isMobile ? s.settingsWrapper : ''}>
      {data && !getProfileLoading ? (
        <>
          <div>
            <UploadPhoto key={data?.avatars.length} profileAvatar={profileAvatar} />
          </div>
          <UserSettingsForm data={data} error={error} onSubmit={updateProfileData} />
        </>
      ) : (
        <>
          <div>
            <PhotoSkeleton />
          </div>
          <FormSkeleton />
        </>
      )}
    </div>
  )
}
