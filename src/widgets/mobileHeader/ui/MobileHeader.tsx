'use client'
import { selectIsUserAuth } from '@/entities/user'
import { MoreIcon } from '@/shared/assets/icons/More'
import { HOME } from '@/shared/config/router'
import { useAppSelector } from '@/shared/config/storeHooks'
import { Button } from '@/shared/ui'
import { LangSwitcher } from '@/widgets/langSwitcher'
import Link from 'next/link'

import s from './mobileHeader.module.scss'

export const MobileHeader = () => {
  const isAuth = useAppSelector(selectIsUserAuth)

  return (
    <header className={s.header}>
      <Link className={s.title} href={HOME}>
        Meetgram
      </Link>
      <div className={s.controls}>
        <LangSwitcher />
        {isAuth && (
          <Button variant={'text'}>
            <MoreIcon className={s.button} />
          </Button>
        )}
      </div>
    </header>
  )
}
