import React from 'react'

import { MoreIcon } from '@/shared/assets/icons/More'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Button, Select } from '@/shared/ui'
import { SidebarItem, SidebarItemType } from '@/widgets/sidebar/sidebarUi/sidebarItem/SidebarItem'
import { useGetSidebarItems } from '@/widgets/sidebar/sidebarUi/useSidebarItems'
import clsx from 'clsx'

import s from '@/widgets/mobileHeader/ui/mobileHeader.module.scss'
import ss from '@/widgets/sidebar/sidebarUi/mobileUi/selectUi/MobileSidebarSelector.module.scss'

export const MobileSidebarSelector = () => {
  const items: SidebarItemType[] = useGetSidebarItems()
  const t = useTranslate()

  return (
    <div>
      <Select
        contentClassName={ss.selectContent}
        placeholder={<MoreIcon className={s.button} />}
        rootClassName={ss.maine}
        showArrow={false}
      >
        <div className={ss.menuContent}>
          {items.map((el, i) => {
            if (i > 3) {
              return (
                <Button className={clsx(ss.item, ss.button)} key={i} variant={'text'}>
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
