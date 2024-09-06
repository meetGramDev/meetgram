import { selectCurrentUserEmail } from '@/entities/user'
import { LogOut } from '@/features/auth/logOut'
import { useAppSelector } from '@/shared/config/storeHooks'
import { SidebarItem, SidebarItemType } from '@/widgets/sidebar/sidebarUi/sidebarItem/SidebarItem'
import clsx from 'clsx'

import s from './sidebar.module.scss'

import { useGetSidebarItems } from '../useSidebarItems'

type Props = {
  className?: string
}

export const Sidebar = ({ className }: Props) => {
  const items: SidebarItemType[] = useGetSidebarItems()
  const email = useAppSelector(selectCurrentUserEmail)

  return (
    <aside className={clsx(s.sidebar, [className])}>
      <nav className={s.itemsList}>
        {items.map((item, i) => (
          <SidebarItem item={item} key={i} />
        ))}
        <LogOut email={email} />
      </nav>
    </aside>
  )
}
