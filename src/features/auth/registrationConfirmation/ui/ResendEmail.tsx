import { useState } from 'react'

import Img from '@/shared/assets/img/time-management.png'
import { EMAIL_FOR_RESEND_LS_KEY } from '@/shared/const/consts'
import { translate } from '@/shared/lib/langSwitcher'
import { isFetchBaseQueryError } from '@/shared/types'
import { Button } from '@/shared/ui'
import { Dialog } from '@/shared/ui/dialog'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './Confirmation.module.scss'

import { useRegistrationEmailResendingMutation } from '../model/services/registration.service'

export const ResendEmail = () => {
  const [registrationEmailResending] = useRegistrationEmailResendingMutation()
  const [open, setOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const tr = translate(useRouter().locale)

  const resetVerificationLink = async () => {
    let email

    if (typeof window !== 'undefined') {
      email = localStorage.getItem(EMAIL_FOR_RESEND_LS_KEY)
      email && setUserEmail(email)
    }
    try {
      email && (await registrationEmailResending({ email }).unwrap())
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data)

        console.error(errMsg, { variant: 'error' })
      }
    }
  }

  const closeHandler = () => {
    setOpen(false)
    setIsDisabled(true)
  }

  return (
    <div className={s.root}>
      <div className={s.textWrapper}>
        <h2>{tr['Email verification link expired']}</h2>
        <div>
          {
            tr[
              'Looks like the verification link has expired. Not to worry, we can send the link again'
            ]
          }
        </div>
      </div>
      <Dialog
        onOpenChange={setOpen}
        open={open}
        title={tr['Email sent']}
        trigger={
          <Button disabled={isDisabled} onClick={resetVerificationLink}>
            {tr['Resend verification link']}
          </Button>
        }
      >
        <div className={s.modalContent}>
          <span>
            {tr['We have sent a link to confirm your email to']} <span>{userEmail}</span>
          </span>
          <Button className={s.button} onClick={closeHandler}>
            {tr['Ok']}
          </Button>
        </div>
      </Dialog>
      <Image alt={'img'} className={s.img} src={Img} />
    </div>
  )
}
