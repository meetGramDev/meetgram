import React from 'react'

import { translate } from '@/shared/lib/langSwitcher'
import { SidebarPng } from '@/widgets/sidebar/ui/sidebar-png/SidebarPng'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './sidebar.module.scss'

import { getSidebarEl } from '../pmg/index'

type TypeProps = {
  className?: string
  pngSize?: number
}

export const Sidebar: React.FC = ({ className, pngSize }: TypeProps) => {
  const { locale } = useRouter()
  const sidebarTr = translate(locale).sidebarTr
  const { bottom, middle, top } = getSidebarEl(sidebarTr)

  return (
    <aside className={s.border_in}>
      <div className={clsx(clsx(s.space, s.space_top), [className])}>
        {top.map((el, i) => (
          <Link className={''} href={el.path} key={i} passHref>
            <SidebarPng className={s.link} name={el.name} png={el.png} size={pngSize || 24} />
          </Link>
        ))}
      </div>

      <div className={clsx(clsx(s.space, s.space_top_bottom), [className])}>
        {middle.map((el, i) => (
          <Link className={''} href={el.path} key={i} passHref>
            <SidebarPng className={s.link} name={el.name} png={el.png} size={pngSize || 24} />
          </Link>
        ))}
      </div>

      <div className={clsx(clsx(s.space, s.space_bottom), [className])}>
        {bottom.map((el, i) => (
          <Link className={''} href={el.path} key={i} passHref>
            <SidebarPng className={s.link} name={el.name} png={el.png} size={pngSize || 24} />
          </Link>
        ))}
      </div>
    </aside>
  )
}
