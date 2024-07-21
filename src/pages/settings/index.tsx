import { UserSettingsForm } from '@/features/userSettings'
import { UserSettingsFormData } from '@/features/userSettings/lib/useUserSettings'
import {
  UpdateProfile,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/pages/profile/model/services/profile.service'
import { useClientProgress } from '@/shared/lib'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'

const SettingsPage: NextPageWithLayout = () => {
  const { data, isLoading } = useGetProfileQuery()
  const [updateProfile, { isLoading: updateProfileLoading }] = useUpdateProfileMutation()

  useClientProgress(isLoading || updateProfileLoading)

  const updateProfileData = async (data: UserSettingsFormData) => {
    // const filteredData = Object.fromEntries(
    //   Object.entries(data).filter(([_, value]) => Boolean(value))
    // )

    console.log(data)

    try {
      await updateProfile({ ...data }).unwrap()
    } catch (e) {
      console.log(e)
    }
  }

  if (!data?.id) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <UserSettingsForm data={data} onSubmit={updateProfileData} />
    </div>
  )
}

SettingsPage.getLayout = getAuthLayout

export default SettingsPage
