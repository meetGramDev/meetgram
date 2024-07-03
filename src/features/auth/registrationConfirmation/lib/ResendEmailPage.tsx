import { useEffect, useState } from 'react'

import { useRegistrationEmailResendingMutation } from '@/features/auth/registrationConfirmation/model/services/registration.service'
import { Tr } from '@/hooks/useLangSwitcher'
import Img from '@/shared/assets/img/time-management.png'
import { EMAIL_FOR_RESEND_LS_KEY } from '@/shared/const/consts'
import { isErrorWithMessage, isFetchBaseQueryError } from '@/shared/types'
import { Button } from '@/shared/ui'
import { Dialog } from '@/shared/ui/dialog'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from '@/pages/auth/registration-confirmation/index.module.scss'

export const ResendEmailPage = () => {
  const [registrationEmailResending] = useRegistrationEmailResendingMutation()
  const [open, setOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [value, setValue] = useState('')
  const locale = useRouter().locale
  const { signUpLang } = Tr(locale)

  const resetVerificationLink = async () => {
    let email

    if (typeof window !== 'undefined') {
      email = localStorage.getItem(EMAIL_FOR_RESEND_LS_KEY)
    }
    try {
      // email !== undefined &&
      //   email !== null &&
      email && (await registrationEmailResending({ email }).unwrap())
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data)

        console.error(errMsg, { variant: 'error' })
      } else if (isErrorWithMessage(err)) {
        console.error(err.message, { variant: 'error' })
      }
    }
  }

  useEffect(() => {
    const localEmail = localStorage.getItem(EMAIL_FOR_RESEND_LS_KEY)

    localEmail && setValue(localEmail)
  }, [])

  return (
    <div className={s.root}>
      <div className={s.textWrapper}>
        <h2 className={s.title}>Email verification link expired</h2>
        <div>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </div>
      </div>
      <Dialog
        onOpenChange={setOpen}
        open={open}
        title={'Email sent'}
        trigger={
          <Button disabled={isDisabled} onClick={resetVerificationLink}>
            Resend verification link
          </Button>
        }
      >
        <div className={s.modalContent}>
          <div>
            {signUpLang.aler}
            {value}
          </div>
          <Button
            className={s.buttonWidth}
            onClick={() => setIsDisabled(true)}
            style={{ alignSelf: 'flex-end' }}
          >
            Ok
          </Button>
        </div>
      </Dialog>
      <Image alt={'img'} className={s.img} src={Img} />
    </div>
  )
}
