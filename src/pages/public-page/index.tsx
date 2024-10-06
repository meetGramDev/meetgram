import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'

const PublicPage: NextPageWithLayout = () => {
  return (
    <div>
      Public pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic
      pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic
      pagePublic pagePublic pagePublic pagePublic pagePublic pagePublic page
    </div>
  )
}

PublicPage.getLayout = getAuthLayout

export default PublicPage
