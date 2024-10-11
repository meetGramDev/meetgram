import React from 'react'

import { useGetSidebarItems } from '@/widgets/sidebar/lib/useSidebarItems'
import { SidebarItem, SidebarItemType } from '@/widgets/sidebar/sidebarItem/SidebarItem'
import clsx from 'clsx'

import s from './mobileSidebar.module.scss'

type Props = {
  className?: string
}

export const MobileSidebar = ({ className }: Props) => {
  const items: SidebarItemType[] = useGetSidebarItems()
  const mobileSidebarItems = items.slice(0, 5)

  return (
    <aside>
      <nav className={clsx(s.sidebar, className)}>
        {mobileSidebarItems.map((el, i) => (
          <SidebarItem className={s.move_item} item={el} key={i} />
        ))}
      </nav>
    </aside>
  )
}
