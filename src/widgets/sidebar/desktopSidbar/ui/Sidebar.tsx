import { useState } from 'react'

import { selectCurrentUserEmail } from '@/entities/user'
import { LogOut } from '@/features/auth/logOut'
import { useAppSelector } from '@/shared/config/storeHooks'
import { SidebarItem, SidebarItemType } from '@/widgets/sidebar/sidebarItem/SidebarItem'
import clsx from 'clsx'

import s from './sidebar.module.scss'

import { useGetSidebarItems } from '../../lib/useSidebarItems'

type Props = {
  className?: string
}

export const Sidebar = ({ className }: Props) => {
  const [currentItem, setCurrentItem] = useState<null | number>(2)
  const items: SidebarItemType[] = useGetSidebarItems()
  const email = useAppSelector(selectCurrentUserEmail)

  return (
    <aside className={clsx(s.sidebar, [className])}>
      <nav className={s.itemsList}>
        {items.map((item, i) => (
          <SidebarItem
            currentItem={currentItem}
            id={i}
            item={item}
            key={i}
            setCurrentItem={() => setCurrentItem(i)}
          />
        ))}
        <LogOut email={email} />
      </nav>
    </aside>
  )
}
