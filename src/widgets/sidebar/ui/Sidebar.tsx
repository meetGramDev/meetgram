import React from 'react'

import { useGetSidebarItems } from '@/widgets/sidebar/ui/useSidebarItems'
import clsx from 'clsx'
import Link from 'next/link'

import s from './sidebar.module.scss'

type TypeProps = {
  className?: string
}

export const Sidebar: React.FC = ({ className }: TypeProps) => {
  const items = useGetSidebarItems()

  return (
    <aside className={clsx(s.border, [className])}>
      {items.map((el, i) => (
        <Link className={s.item} href={el.path} key={i} passHref>
          <el.svg />
          {el.name}
        </Link>
      ))}
    </aside>
  )
}
