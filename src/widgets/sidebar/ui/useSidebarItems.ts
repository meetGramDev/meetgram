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
      { Svg: HomeIcon, name: sidebarTr.home, path: `${HOME}` },
      { Svg: CreateIcon, isCreatePost: true, name: sidebarTr.create, path: `` },
      { Svg: MyProfileIcon, name: sidebarTr.myProfile, path: `${HOME}` },
      { Svg: MessengerIcon, name: sidebarTr.messenger, path: '' },
      { Svg: Search, name: sidebarTr.search, path: '' },

      { Svg: FavoritesIcon, name: sidebarTr.favorites, path: '' },
      { Svg: StatisticsIcon, name: sidebarTr.statistics, path: '' },
    ]
  }, [locale])
}
