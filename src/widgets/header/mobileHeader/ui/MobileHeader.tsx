'use client'
import { selectIsUserAuth } from '@/entities/user'
import { HOME } from '@/shared/config/router'
import { useAppSelector } from '@/shared/config/storeHooks'
import { LangSwitcher } from '@/widgets/langSwitcher'
import { MobileSidebarSelector } from '@/widgets/sidebar'
import clsx from 'clsx'
import Link from 'next/link'

import s from './mobileHeader.module.scss'

type Props = {
  className?: string
}

export const MobileHeader = ({ className }: Props) => {
  const isAuth = useAppSelector(selectIsUserAuth)

  return (
    <header className={clsx(s.header, className)}>
      <Link className={s.title} href={HOME}>
        Meetgram
      </Link>
      <div className={s.controls}>
        <LangSwitcher />
        {isAuth && <MobileSidebarSelector />}
      </div>
    </header>
  )
}
