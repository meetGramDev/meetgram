import React from 'react'

import { selectCurrentUserEmail } from '@/entities/user'
import { LogOut } from '@/features/auth/logOut'
import { MoreIcon } from '@/shared/assets/icons/More'
import { Setting } from '@/shared/assets/icons/Settings'
import { PROFILE_SETTINGS } from '@/shared/config/router'
import { useAppSelector } from '@/shared/config/storeHooks'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Button, Select } from '@/shared/ui'
import { useGetSidebarItems } from '@/widgets/sidebar/lib/useSidebarItems'
import { SidebarItem, SidebarItemType } from '@/widgets/sidebar/sidebarItem/SidebarItem'
import clsx from 'clsx'
import Link from 'next/link'

import s from '@/widgets/sidebar/mobileSidbar/select/MobileSidebarSelector.module.scss'

export const MobileSidebarSelector = () => {
  const items: SidebarItemType[] = useGetSidebarItems()
  const email = useAppSelector(selectCurrentUserEmail)
  const t = useTranslate()
  const mobileSidebarSelectorItems = items.slice(5).reverse()

  return (
    <div>
      <Select
        contentClassName={s.selectContent}
        placeholder={<MoreIcon className={s.moreIcon} />}
        rootClassName={s.maine}
        showArrow={false}
      >
        <div className={s.menuContent}>
          <Button
            as={Link}
            className={clsx(s.item, s.button)}
            href={PROFILE_SETTINGS}
            variant={'text'}
          >
            <Setting /> {t('Profile Settings')}
          </Button>
          {mobileSidebarSelectorItems.map((el, i) => (
            <Button className={clsx(s.item, s.button)} key={i} variant={'text'}>
              <SidebarItem item={el} />
              {el.name}
            </Button>
          ))}
          <Button
            as={Link}
            className={clsx(s.item, s.button)}
            href={PROFILE_SETTINGS}
            variant={'text'}
          >
            <LogOut email={email} />
          </Button>
        </div>
      </Select>
    </div>
  )
}
