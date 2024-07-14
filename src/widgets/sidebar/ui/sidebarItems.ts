import { useMemo } from 'react'

import { CreateIcon } from '@/shared/assets/icons/Create'
import { FavoritesIcon } from '@/shared/assets/icons/Favorites'
import { HomeIcon } from '@/shared/assets/icons/Home'
import { LogOutIcon } from '@/shared/assets/icons/LogOut'
import { MessengerIcon } from '@/shared/assets/icons/Messenger'
import { MyProfileIcon } from '@/shared/assets/icons/MyProfile'
import { Search } from '@/shared/assets/icons/Search'
import { StatisticsIcon } from '@/shared/assets/icons/Statistics'
import { HOME } from '@/shared/config/router'

import { SidebarTr } from '../../../../public/locales/en'

type SidebarEl = { name: string; path: string; svg: typeof LogOutIcon }

export function GetSidebarItems(sidebarTr: SidebarTr) {
  return useMemo((): SidebarEl[] => {
    return [
      { name: sidebarTr.home, path: HOME, svg: HomeIcon },
      { name: sidebarTr.create, path: '', svg: CreateIcon },
      { name: sidebarTr.myProfile, path: '', svg: MyProfileIcon },
      { name: sidebarTr.messenger, path: '', svg: MessengerIcon },
      { name: sidebarTr.search, path: '', svg: Search },

      { name: sidebarTr.favorites, path: '', svg: FavoritesIcon },
      { name: sidebarTr.statistics, path: '', svg: StatisticsIcon },
      { name: sidebarTr.logOut, path: '', svg: LogOutIcon },
    ]
  }, [])
}
