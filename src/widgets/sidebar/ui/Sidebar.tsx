import React from 'react'

import { translate } from '@/shared/lib/langSwitcher'
import { getSidebarEl } from '@/widgets/sidebar/ui/index'
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
  const { bottom, middle, top } = getSidebarEl(sidebarTr)

  return (
    <aside className={clsx(clsx(s.border), [className])}>
      <div>
        {top.map((el, i) => (
          <Link href={el.path} key={i} passHref>
            <el.svg />
            {el.name}
          </Link>
        ))}
      </div>

      <div>
        {middle.map((el, i) => (
          <Link href={el.path} key={i} passHref>
            <el.svg />
            {el.name}
          </Link>
        ))}
      </div>

      <div>
        {bottom.map((el, i) => (
          <Link className={s.link} href={el.path} key={i} passHref>
            <el.svg />
            {el.name}
          </Link>
        ))}
      </div>
    </aside>
  )
}
