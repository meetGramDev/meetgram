import { HOME } from '@/shared/config/router'

import { SidebarTr } from '../../../../../public/locales/en'
import homePmg from './1_home/home2.png'
import createPng from './2_create/create2.png'
import myProfilePng from './3_my_profile/my_profile2.png'
import messengerPng from './4_messenger/messenger2.png'
import searchPng from './5_search/serch2.png'
import statisticsPng from './6_statistics/statistics2.png'
import favoritesPng from './7_favorites/favorites2.png'
import logOutPmg from './8_log_out/account2.png'

const create = 'Create'
const favorites = 'Favorites'
const home = 'Home'
const logOut = 'Log Out'
const messenger = 'Messenger'
const myProfile = 'My Profile'
const search = 'Search'
const statistics = 'Statistics'

const sidebarEl = getSidebarEl()

export type TypeEl = typeof sidebarEl

function getSidebarEl(sidebarTr?: SidebarTr) {
  return {
    bottom: [{ name: sidebarTr ? sidebarTr.logOut : logOut, path: '', png: logOutPmg }],
    middle: [
      { name: sidebarTr ? sidebarTr.favorites : favorites, path: '', png: favoritesPng },
      { name: sidebarTr ? sidebarTr.statistics : statistics, path: '', png: statisticsPng },
    ],
    top: [
      { name: sidebarTr ? sidebarTr.home : home, path: HOME, png: homePmg },
      { name: sidebarTr ? sidebarTr.create : create, path: '', png: createPng },
      { name: sidebarTr ? sidebarTr.myProfile : myProfile, path: '', png: myProfilePng },
      { name: sidebarTr ? sidebarTr.messenger : messenger, path: '', png: messengerPng },
      { name: sidebarTr ? sidebarTr.search : search, path: '', png: searchPng },
    ],
  }
}

export type TypePng = typeof homePmg

export { getSidebarEl }
