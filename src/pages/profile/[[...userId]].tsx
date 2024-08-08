import { User, selectCurrentUserName } from '@/entities/user'
import { useAppSelector } from '@/shared/config/storeHooks'
import { NextPageWithLayout } from '@/shared/types'
import { getMainLayout } from '@/widgets/layouts/ui/MainLayout/MainLayout'
import { useRouter } from 'next/router'

const UserId: NextPageWithLayout = () => {
  const router = useRouter()
  const userName = useAppSelector(selectCurrentUserName)

  const userId = router.query.userId

  return <User userName={userName} />
}

UserId.getLayout = getMainLayout

export default UserId
