import { useMemo, useState } from 'react'
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
import { useTranslate } from '@/shared/lib/useTranslate'
import { NextPageWithLayout, isErrorServerMessagesType } from '@/shared/types'
import { TabSwitcher } from '@/shared/ui'
import { TabType } from '@/shared/ui/tabSwitcher/TabSwitcher'
import { getMainLayout } from '@/widgets/layouts/ui/MainLayout/MainLayout'
import { useRouter } from 'next/router'

import s from './index.module.scss'

const useTabs = () => {
  const t = useTranslate()
  const { locale } = useRouter()

  return useMemo(() => {
    return [
      { text: t('General Information'), value: 'generalInformation' },
      { text: t('Devices'), value: 'devices' },
      { text: t('Account Management'), value: 'accountManagement' },
      { text: t('My Payments'), value: 'myPayments' },
    ]
  }, [locale])
}

const Settings: NextPageWithLayout = () => {
  const tabs: TabType[] = useTabs()
  const { data, isLoading: getProfileLoading } = useGetProfileQuery()

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

  useClientProgress(getProfileLoading || updateProfileLoading)

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
    <div>
      <TabSwitcher onValueChange={setActiveTab} tabs={tabs} value={activeTab} />
      <div className={s.settingsWrapper}>
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
    </div>
  )
}

Settings.getLayout = getMainLayout

export default Settings
