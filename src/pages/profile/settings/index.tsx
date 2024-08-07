import { useState } from 'react'
import { toast } from 'react-toastify'

import { UploadPhoto, UploadedPhotoType } from '@/features/profile/uploadUserPhoto'
import {
  UserSettingsForm,
  UserSettingsFormData,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/features/userSettings'
import { ServerMessagesType } from '@/shared/api'
import { serverErrorHandler, useClientProgress } from '@/shared/lib'
import { NextPageWithLayout, isErrorServerMessagesType } from '@/shared/types'
import { TabSwitcher } from '@/shared/ui'
import { TabType } from '@/shared/ui/tabSwitcher/TabSwitcher'
import { getMainLayout } from '@/widgets/layouts/ui/MainLayout/MainLayout'

import s from './index.module.scss'

const tabs: TabType[] = [
  { text: 'General Information', value: 'generalInformation' },
  { text: 'Devices', value: 'devices' },
  { text: 'Account Management', value: 'accountManagement' },
  { text: 'My Payments', value: 'myPayments' },
]

const Settings: NextPageWithLayout = () => {
  const { data, isLoading } = useGetProfileQuery()

  const [activeTab, setActiveTab] = useState(tabs[0].value)
  const [error, setError] = useState<ServerMessagesType[]>([])

  const profileAvatar: UploadedPhotoType | undefined =
    data && data.avatars.length !== 0
      ? {
          height: data.avatars[0].height,
          url: data.avatars[0].url,
          width: data.avatars[0].width,
        }
      : undefined

  const [updateProfile, { isLoading: updateProfileLoading }] = useUpdateProfileMutation()

  useClientProgress(isLoading || updateProfileLoading)

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

  if (!data?.id) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <TabSwitcher onValueChange={setActiveTab} tabs={tabs} value={activeTab} />
      <div className={s.settingsWrapper}>
        <div>
          <UploadPhoto key={data?.avatars.length} profileAvatar={profileAvatar} />
        </div>
        <UserSettingsForm data={data} error={error} onSubmit={updateProfileData} />
      </div>
    </div>
  )
}

Settings.getLayout = getMainLayout

export default Settings
