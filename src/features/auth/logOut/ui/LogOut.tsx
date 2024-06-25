import { useState } from 'react'

import { useLogOutMutation } from '@/features/auth/logOut/model/services/logOut.service'
import { baseApi } from '@/shared/api'
import { LogOutIcon } from '@/shared/assets/icons/LogOut'
import { SIGN_IN } from '@/shared/config/router'
import { useAppDispatch } from '@/shared/config/storeHooks'
import { Button } from '@/shared/ui/button/button'
import { Dialog } from '@/shared/ui/dialog'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from './logOut.module.scss'

type Props = {
  disabled?: boolean
  email: string
}

export const LogOut = ({ disabled, email }: Props) => {
  const [logout, { error }] = useLogOutMutation()
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const logOutHandler = () => {
    logout()
      .then(res => {
        if ('data' in res) {
          router.push(SIGN_IN)
        } else if ('error' in res) {
          const errorData = res.error

          if ('status' in errorData && errorData.status === 401) {
            dispatch(baseApi.util?.resetApiState())
            router.push(SIGN_IN)
          } else {
            console.error(errorData)
          }
        }
      })
      .finally(() => setOpen(false))
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
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Are you really want to log out of your account "<span className={s.email}>{email}</span>"?
        </span>
        <div className={s.contentButtons}>
          <Button onClick={logOutHandler} style={{ width: '6rem' }} variant={'outlined'}>
            Yes
          </Button>
          <Button onClick={() => setOpen(false)} style={{ width: '6rem' }} variant={'primary'}>
            No
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
