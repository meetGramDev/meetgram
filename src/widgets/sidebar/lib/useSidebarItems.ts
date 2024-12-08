import { useMemo } from 'react'

import { CreateIcon } from '@/shared/assets/icons/Create'
import { FavoritesIcon } from '@/shared/assets/icons/Favorites'
import { HomeIcon } from '@/shared/assets/icons/Home'
import { MessengerIcon } from '@/shared/assets/icons/Messenger'
import { MyProfileIcon } from '@/shared/assets/icons/MyProfile'
import { Search } from '@/shared/assets/icons/Search'
import { StatisticsIcon } from '@/shared/assets/icons/Statistics'
import { HOME, PUBLIC_PAGE } from '@/shared/config/router'
import { useAppSelector } from '@/shared/config/storeHooks'
import { useTranslate } from '@/shared/lib/useTranslate'
import { useRouter } from 'next/router'

export function useGetSidebarItems() {
  const { locale } = useRouter()
  const userId = useAppSelector(state => state.user.accountData.userId)
  const t = useTranslate()

  return useMemo(() => {
    return [
      { Svg: HomeIcon, name: t('sidebarTr.home'), path: PUBLIC_PAGE },
      { Svg: CreateIcon, isCreatePost: true, name: t('sidebarTr.create'), path: `` },
      { Svg: MyProfileIcon, name: t('sidebarTr.myProfile'), path: `${HOME}/${userId}` },
      { Svg: MessengerIcon, name: t('sidebarTr.messenger'), path: '' },
      { Svg: Search, name: t('sidebarTr.search'), path: `/search` },

      { Svg: FavoritesIcon, name: t('sidebarTr.favorites'), path: '' },
      { Svg: StatisticsIcon, name: t('sidebarTr.statistics'), path: '' },
    ]
  }, [locale, userId])
}
