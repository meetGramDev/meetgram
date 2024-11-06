'use client'
import { selectCurrentUserId, selectIsUserAuth } from '@/entities/user'
import { HOME, PROFILE, PUBLIC_PAGE } from '@/shared/config/router'
import { useAppSelector } from '@/shared/config/storeHooks'
import { Button } from '@/shared/ui'
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
  const userId = useAppSelector(selectCurrentUserId)

  return (
    <header className={clsx(s.header, className)}>
      <Link className={s.title} href={!isAuth ? PUBLIC_PAGE : `${PROFILE}/${userId}`}>
        Meetgram
      </Link>
      <div className={s.controls}>
        <LangSwitcher />
        {isAuth && <MobileSidebarSelector />}
      </div>
    </header>
  )
}
