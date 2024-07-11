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

const create = 'Create'
const favorites = 'Favorites'
const home = 'Home'
const logOut = 'Log Out'
const messenger = 'Messenger'
const myProfile = 'My Profile'
const search = 'Search'
const statistics = 'Statistics'

function getSidebarEl(sidebarTr?: SidebarTr) {
  return {
    bottom: [{ name: sidebarTr ? sidebarTr.logOut : logOut, path: '', svg: LogOutIcon }],
    middle: [
      { name: sidebarTr ? sidebarTr.favorites : favorites, path: '', svg: FavoritesIcon },
      { name: sidebarTr ? sidebarTr.statistics : statistics, path: '', svg: StatisticsIcon },
    ],
    top: [
      { name: sidebarTr ? sidebarTr.home : home, path: HOME, svg: HomeIcon },
      { name: sidebarTr ? sidebarTr.create : create, path: '', svg: CreateIcon },
      { name: sidebarTr ? sidebarTr.myProfile : myProfile, path: '', svg: MyProfileIcon },
      { name: sidebarTr ? sidebarTr.messenger : messenger, path: '', svg: MessengerIcon },
      { name: sidebarTr ? sidebarTr.search : search, path: '', svg: Search },
    ],
  }
}

export type TypePng = typeof HomeIcon

export { getSidebarEl }
