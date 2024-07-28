import { User } from '@/entities/user'
import { getMainLayout } from '@/widgets/layouts/ui/MainLayout/MainLayout'
import { useRouter } from 'next/router'

function UserId() {
  const router = useRouter()

  const userId = router.query.userId

  return <User userName={userName} />
}

UserId.getLayout = getMainLayout
export default UserId
