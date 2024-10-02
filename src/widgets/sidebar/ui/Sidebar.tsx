import React from 'react'

import { selectCurrentUserEmail } from '@/entities/user'
import { LogOut } from '@/features/auth/logOut'
import { useAppSelector } from '@/shared/config/storeHooks'
import { useGetSidebarItems } from '@/widgets/sidebar/ui/useSidebarItems'
import clsx from 'clsx'
import Link from 'next/link'

import s from './sidebar.module.scss'

type Props = {
  className?: string
}

type SidebarItem = {
  name: string
  path: string
  svg: React.FC<React.SVGProps<SVGSVGElement>>
}

export const Sidebar = ({ className }: Props) => {
  const items: SidebarItem[] = useGetSidebarItems()
  const email = useAppSelector(selectCurrentUserEmail)

  return (
    <aside className={clsx(s.sidebar, [className])}>
      <nav className={s.itemsList}>
        {items.map((el, i) => (
          <Link className={s.item} href={el.path} key={i} passHref>
            <el.svg />
            {el.name}
          </Link>
        ))}
      </nav>
      <LogOut email={email} />
    </aside>
  )
}
