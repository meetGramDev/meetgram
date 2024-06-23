import { useState } from 'react'

import { useLogOutMutation } from '@/features/auth/logOut/model/services/logOut.service'
import { LogOutIcon } from '@/shared/assets/icons/LogOut'
import { SIGN_IN } from '@/shared/config/router'
import { Button } from '@/shared/ui/button/button'
import { Dialog } from '@/shared/ui/dialog'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './logOut.module.scss'

type Props = {
  disabled?: boolean
  email: string
}

export const LogOut = ({ disabled, email }: Props) => {
  const [logout] = useLogOutMutation()
  const [open, setOpen] = useState(false)

  return (
    <Dialog
      onOpenChange={setOpen}
      open={open}
      title={'Log Out'}
      trigger={
        <Button
          className={clsx(disabled && s.disabled, s.buttonTrigger)}
          disabled={disabled}
          variant={'text'}
        >
          <LogOutIcon />
          Log Out
        </Button>
      }
    >
      <div className={s.logOutContent}>
        <span className={s.contentText}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Are you really want to log out of your account "<span className={s.email}>{email}</span>"?
        </span>
        <div className={s.contentButtons}>
          <Button
            as={Link}
            className={s.buttonWidth}
            href={SIGN_IN}
            onClick={() => logout()}
            variant={'outlined'}
          >
            Yes
          </Button>
          <Button className={s.buttonWidth} onClick={() => setOpen(false)} variant={'primary'}>
            No
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
