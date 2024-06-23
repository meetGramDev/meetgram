import { useState } from 'react'

import { useLogOutMutation } from '@/features/auth/logOut/model/services/logOut.service'
import { SIGN_IN } from '@/shared/config/router'
import { Button } from '@/shared/ui/button/button'
import { Dialog } from '@/shared/ui/dialog'
import Link from 'next/link'

import s from './logOut.module.scss'

type Props = {
  email: string
}

export const LogOut = ({ email }: Props) => {
  const [logout] = useLogOutMutation()
  const [open, setOpen] = useState(false)
  const logoutHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        //navigate('/sign-in')
      })
  }

  return (
    <Dialog
      onOpenChange={setOpen}
      open={open}
      title={'Log Out'}
      trigger={<Button variant={'text'}>Log Out</Button>}
    >
      <span className={s.contentText}>Are you really want to log out of your account {email}</span>
      <div>
        <Button as={Link} href={SIGN_IN} onClick={() => logout()} variant={'primary'}>
          Yes
        </Button>
        <Button onClick={() => setOpen(false)} variant={'outlined'}>
          No
        </Button>
      </div>
    </Dialog>
  )
}
