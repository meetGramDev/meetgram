import { useState } from 'react'

import { baseApi } from '@/shared/api'
import { nextSessionApi } from '@/shared/api/_next-auth'
import { LogOutIcon } from '@/shared/assets/icons/LogOut'
import { ConfirmClosingDialog } from '@/shared/components/dialog'
import { SIGN_IN } from '@/shared/config/router'
import { useAppDispatch } from '@/shared/config/storeHooks'
import { serverErrorHandler } from '@/shared/lib'
import { useTranslate } from '@/shared/lib/useTranslate'
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
  const dispatch = useAppDispatch()

  const t = useTranslate()

  const router = useRouter()

  const handleLogOut = async (isConfirm: boolean) => {
    if (!isConfirm) {
      setOpen(false)

      return
    }

    try {
      const resp = await logout().unwrap()

      if (resp) {
        dispatch(baseApi.util.resetApiState())
        router.push(SIGN_IN, undefined, { locale: router.locale })
      }
    } catch (err) {
      const message = serverErrorHandler(err)

      if (message) {
        await nextSessionApi.deleteSession()
      }
    } finally {
      setOpen(false)
    }
  }

  /*<Button
            className={clsx(disabled && s.disabled, s.buttonTrigger)}
            disabled={disabled}
            variant={'text'}
          >*/

  /*</Button>*/

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
          {t('Log Out')}
        </Button>
      }
    >
      <ConfirmClosingDialog
        message={
          <span className={s.contentText}>
            {t('Are you really want to log out of your account')} &quot;
            <span className={'font-bold'}>{email}</span>&quot; ?
          </span>
        }
        onConfirm={handleLogOut}
      />
    </Dialog>
  )
}
