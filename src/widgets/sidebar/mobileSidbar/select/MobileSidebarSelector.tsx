import React from 'react'

import { MoreIcon } from '@/shared/assets/icons/More'
import { Setting } from '@/shared/assets/icons/Settings'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Button, Select } from '@/shared/ui'
import { useGetSidebarItems } from '@/widgets/sidebar/lib/useSidebarItems'
import { SidebarItem, SidebarItemType } from '@/widgets/sidebar/sidebarItem/SidebarItem'
import clsx from 'clsx'

import s from '@/widgets/sidebar/mobileSidbar/select/MobileSidebarSelector.module.scss'

export const MobileSidebarSelector = () => {
  const items: SidebarItemType[] = useGetSidebarItems()
  const t = useTranslate()

  return (
    <div>
      <Select
        contentClassName={s.selectContent}
        placeholder={<MoreIcon className={s.moreIcon} />}
        rootClassName={s.maine}
        showArrow={false}
      >
        <div className={s.menuContent}>
          <Button className={clsx(s.item, s.button)} variant={'text'}>
            <Setting /> {t('Profile Settings')}
          </Button>
          {items.map((el, i) => {
            if (i > 3) {
              return (
                <Button className={clsx(s.item, s.button)} key={i} variant={'text'}>
                  <SidebarItem item={el} />
                  {el.name}
                </Button>
              )
            }
          })}
        </div>
      </Select>
    </div>
  )
}
