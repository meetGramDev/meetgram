import React from 'react'

import { useGetSidebarItems } from '@/widgets/sidebar/lib/useSidebarItems'
import { SidebarItem, SidebarItemType } from '@/widgets/sidebar/sidebarItem/SidebarItem'

import s from './mobileSidebar.module.scss'

export const MobileSidebar = () => {
  const items: SidebarItemType[] = useGetSidebarItems()

  return (
    <aside>
      <nav className={s.sidebar}>
        {items.map((el, i) => {
          if (i < 5) {
            return <SidebarItem className={s.move_item} item={el} key={i} />
          }
        })}
      </nav>
    </aside>
  )
}
