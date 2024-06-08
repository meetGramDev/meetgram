import { Notification } from '@/shared/assets/icons/Notification'
import { Button } from '@/shared/ui/button/button'
import { OptionType } from '@/shared/ui/select/option'
import { Select } from '@/shared/ui/select/select'
import clsx from 'clsx'
import Link from 'next/link'

import s from './Header.module.scss'

const languages: OptionType[] = [
  { label: 'Russian', value: 'ru' },
  { label: 'English', value: 'en' },
]

type Props = {
  isAuth?: boolean
  notification?: number
}

export const Header = ({ isAuth = true, notification }: Props) => {
  return (
    <header className={s.header}>
      <Link className={s.logo} href={'/'}>
        Meetgram
      </Link>
      <div className={s.inner}>
        <div className={s.actions}>
          {isAuth && (
            <div className={clsx(s.notification, notification && s.messageCounter)}>
              <Notification />
            </div>
          )}
          <Select defaultValue={'ru'} options={languages} />
        </div>

        {!isAuth && (
          <div className={s.buttons}>
            <Button variant={'text'}>Log in</Button>
            <Button variant={'primary'}>Sign up</Button>
          </div>
        )}
      </div>
    </header>
  )
}
