import {
  UserSettingsForm,
  UserSettingsFormData,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/features/userSettings'
import { useClientProgress } from '@/shared/lib'
import { NextPageWithLayout } from '@/shared/types'
import { getMainLayout } from '@/widgets/layouts/ui/MainLayout'

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
    <div style={{ padding: '30px' }}>
      <UserSettingsForm onSubmit={updateProfileData} />
    </div>
  )
}

SettingsPage.getLayout = getMainLayout

export default SettingsPage
