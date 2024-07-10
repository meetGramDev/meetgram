'use client'
import { MoreIcon } from '@/shared/assets/icons/More'
import { HOME } from '@/shared/config/router'
import { Button } from '@/shared/ui'
import { LangSwitcher } from '@/widgets/langSwitcher'
import Link from 'next/link'

import s from './mobileHeader.module.scss'

type Props = {
  isAuth?: boolean
}

export const MobileHeader = ({ isAuth = false }: Props) => {
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
