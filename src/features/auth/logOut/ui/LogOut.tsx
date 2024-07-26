import { useState } from 'react'

import { LogOutIcon } from '@/shared/assets/icons/LogOut'
import { SIGN_IN } from '@/shared/config/router'
import { useAppDispatch } from '@/shared/config/storeHooks'
import { isErrorWithMessage, isFetchBaseQueryError } from '@/shared/types'
import { Button } from '@/shared/ui/button/button'
import { Dialog } from '@/shared/ui/dialog'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from './logOut.module.scss'

import { useLogOutMutation } from '../model/services/logOut.service'

type Props = {
  disabled?: boolean
  email: string
}

export const LogOut = ({ disabled, email }: Props) => {
  const [logout] = useLogOutMutation()
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleLogOut = async () => {
    try {
      await logout().unwrap()

      // router.prefetch(SIGN_IN, SIGN_IN, { locale: router.locale })
      // router.push(SIGN_IN, SIGN_IN, { locale: router.locale })
      router.reload()
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data)

        router.push(SIGN_IN)
        console.error(errMsg, { variant: 'error' })
      } else if (isErrorWithMessage(err)) {
        console.error(err.message, { variant: 'error' })
      }
    } finally {
      setOpen(false)
    }
  }

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
          Are you really want to log out of your account &quot;
          <span className={s.email}>{email}</span>&quot;?
        </span>
        <div className={s.contentButtons}>
          <Button className={s.buttonWidth} onClick={handleLogOut} variant={'outlined'}>
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
