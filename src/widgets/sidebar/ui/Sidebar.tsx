import React from 'react'

import { translate } from '@/shared/lib/langSwitcher'
import { getSidebarEl } from '@/widgets/sidebar/ui/index'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './sidebar.module.scss'

type TypeProps = {
  className?: string
  pngSize?: number
}

export const Sidebar: React.FC = ({ className, pngSize }: TypeProps) => {
  const { locale } = useRouter()
  const sidebarTr = translate(locale).sidebarTr
  const { bottom, middle, top } = getSidebarEl(sidebarTr)

  return (
    <aside className={s.border}>
      <div className={clsx(clsx(s.gap, s.gapTop), [className])}>
        {top.map((el, i) => (
          <Link href={el.path} key={i} passHref>
            <div className={s.link}>
              <el.svg />
              {el.name}
            </div>
          </Link>
        ))}
      </div>

      <div className={clsx(clsx(s.gap, s.gapTopAndBottom), [className])}>
        {middle.map((el, i) => (
          <Link href={el.path} key={i} passHref>
            <div className={clsx(s.link)}>
              <el.svg />
              {el.name}
            </div>
          </Link>
        ))}
      </div>

      <div className={clsx(clsx(s.gap, s.gapBottom), [className])}>
        {bottom.map((el, i) => (
          <Link href={el.path} key={i} passHref>
            <div className={s.link}>
              <el.svg />
              {el.name}
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}
