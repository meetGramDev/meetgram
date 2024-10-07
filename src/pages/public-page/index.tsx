import { TotalUsersCount } from '@/features/user/totalUsersCount/ui/totalUsersCount'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'

const PublicPage: NextPageWithLayout = () => {
  return (
    <div className={'px-[9.5rem]'}>
      <TotalUsersCount usersCount={123} />
      Public pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic
      pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic
      pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic page
    </div>
  )
}

PublicPage.getLayout = getAuthLayout

export default PublicPage
