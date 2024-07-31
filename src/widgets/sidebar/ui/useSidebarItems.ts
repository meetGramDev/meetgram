import { useMemo } from 'react'

import { CreateIcon } from '@/shared/assets/icons/Create'
import { FavoritesIcon } from '@/shared/assets/icons/Favorites'
import { HomeIcon } from '@/shared/assets/icons/Home'
import { MessengerIcon } from '@/shared/assets/icons/Messenger'
import { MyProfileIcon } from '@/shared/assets/icons/MyProfile'
import { Search } from '@/shared/assets/icons/Search'
import { StatisticsIcon } from '@/shared/assets/icons/Statistics'
import { HOME } from '@/shared/config/router'
import { useAppSelector } from '@/shared/config/storeHooks'
import { translate } from '@/shared/lib/langSwitcher'
import { useRouter } from 'next/router'

export function useGetSidebarItems() {
  const { locale } = useRouter()
  const sidebarTr = translate(locale).sidebarTr
  const userId = useAppSelector(state => state.user.accountData.userId)

  return useMemo(() => {
    return [
      { name: sidebarTr.home, path: `${HOME}/${userId}`, svg: HomeIcon },
      { name: sidebarTr.create, path: '', svg: CreateIcon },
      { name: sidebarTr.myProfile, path: '', svg: MyProfileIcon },
      { name: sidebarTr.messenger, path: '', svg: MessengerIcon },
      { name: sidebarTr.search, path: '', svg: Search },

      { name: sidebarTr.favorites, path: '', svg: FavoritesIcon },
      { name: sidebarTr.statistics, path: '', svg: StatisticsIcon },
    ]
  }, [])
}
