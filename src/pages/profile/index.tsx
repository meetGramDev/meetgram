// import { User, selectCurrentUserName } from '@/entities/user'
// import { PROFILE } from '@/shared/config/router'
// import { useAppSelector } from '@/shared/config/storeHooks'
// import { getMainLayout } from '@/widgets/layouts/ui/MainLayout/MainLayout'
// import { useRouter } from 'next/router'
//
// function Profile() {
//   const userName = useAppSelector(selectCurrentUserName)
//   const userId = useAppSelector(state => state.user.accountData.userId)
//   const router = useRouter()
//
//   if (userId) {
//     router.push(`${PROFILE}/${userId}`)
//   }
//
//   return <User userName={`userName`} />
// }
//
// Profile.getLayout = getMainLayout
//
// export default Profile
