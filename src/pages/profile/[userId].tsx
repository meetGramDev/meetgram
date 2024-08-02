import { User, selectCurrentUserName } from '@/entities/user'
import { useAppSelector } from '@/shared/config/storeHooks'
import { getMainLayout } from '@/widgets/layouts/ui/MainLayout/MainLayout'
import { useRouter } from 'next/router'

function UserId() {
  const router = useRouter()
  const userName = useAppSelector(selectCurrentUserName)

  const userId = router.query.userId

  return <User userName={userName} />
}

UserId.getLayout = getMainLayout

export default UserId
