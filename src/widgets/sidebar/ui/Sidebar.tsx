import React from 'react'

import { translate } from '@/shared/lib/langSwitcher'
import { GetSidebarItems } from '@/widgets/sidebar/ui/sidebarItems'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './sidebar.module.scss'

type TypeProps = {
  className?: string
}

export const Sidebar: React.FC = ({ className }: TypeProps) => {
  const { locale } = useRouter()
  const sidebarTr = translate(locale).sidebarTr

  return (
    <aside className={clsx(s.border, [className])}>
      {GetSidebarItems(sidebarTr).map((el, i) => (
        <Link className={s.item} href={el.path} key={i} passHref>
          <el.svg />
          {el.name}
        </Link>
      ))}
    </aside>
  )
}
