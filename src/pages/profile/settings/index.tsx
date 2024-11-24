import { useMemo, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'

import { UploadPhoto, UploadedPhotoType } from '@/features/profile/uploadUserPhoto'
import { UserManagement } from '@/features/profile/userManagement'
import {
  FormSkeleton,
  PhotoSkeleton,
  UserSettingsForm,
  UserSettingsFormData,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/features/profile/userSettings'
import { ServerMessagesType } from '@/shared/api'
import { PROFILE_SETTINGS } from '@/shared/config/router'
import { serverErrorHandler, useClientProgress } from '@/shared/lib'
import { useTranslate } from '@/shared/lib/useTranslate'
import { NextPageWithLayout, isErrorServerMessagesType } from '@/shared/types'
import { TabContent, TabSwitcher, TabType } from '@/shared/ui'
import { getMainLayout } from '@/widgets/layouts/ui/MainLayout/MainLayout'
import { AccountManagement } from '@/widgets/settings-tabs/account-management'
import { MyPayments } from '@/widgets/settings-tabs/my-payments'
import { useRouter } from 'next/router'

import s from './index.module.scss'

const useTabs = () => {
  const t = useTranslate()
  const { locale } = useRouter()

  return useMemo(() => {
    return [
      { text: t('General Information'), value: 'general-information' },
      { text: t('Devices'), value: 'devices' },
      { text: t('Account Management'), value: 'account-management' },
      { text: t('My Payments'), value: 'my-payments' },
    ]
  }, [locale])
}

const Settings: NextPageWithLayout = () => {
  const isMobile = useMediaQuery({ query: '(max-width:650px)' })
  const tabs: TabType[] = useTabs()
  const router = useRouter()
  const activeTab = Object.keys(router.query)[0] as string | undefined

  const { data, isLoading: getProfileLoading } = useGetProfileQuery()
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

  const handleTabChange = (value: string) => {
    if (value === tabs[0].value) {
      router.push(PROFILE_SETTINGS, undefined, { locale: router.locale, shallow: true })
    } else {
      router.push(`${router.pathname}?${value}`, undefined, {
        locale: router.locale,
        shallow: true,
      })
    }
  }

  // TODO сделать отдельную компоненту для настроек профиля
  return (
    <div>
      <TabSwitcher onValueChange={handleTabChange} tabs={tabs} value={activeTab ?? tabs[0].value}>
        <TabContent value={tabs[0].value}>
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
        </TabContent>

        <TabContent value={tabs[2].value}>
          {/*<AccountManagement />*/}
          <UserManagement />
        </TabContent>

        <TabContent value={tabs[3].value}>
          <MyPayments />
        </TabContent>
      </TabSwitcher>
    </div>
  )
}

Settings.getLayout = getMainLayout

export default Settings
