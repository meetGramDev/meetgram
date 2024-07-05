import React from 'react'

import SignInImg from '@/shared/assets/img/sign-up_bro.png'
import { SIGN_IN } from '@/shared/config/router'
import { EMAIL_FOR_RESEND_LS_KEY } from '@/shared/const/consts'
import { Button } from '@/shared/ui'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from '@/pages/auth/registration-confirmation/index.module.scss'

export const ConfirmEmail = () => {
  const router = useRouter()
  const onClickHandler = () => {
    localStorage.removeItem(EMAIL_FOR_RESEND_LS_KEY)
    router.push(SIGN_IN)
  }

  return (
    <div className={s.root}>
      <div className={s.textWrapper}>
        <h2 className={s.title}>Congratulations!</h2>
        <div>Your email has been confirmed</div>
        <Button onClick={onClickHandler}>Sign In</Button>
      </div>
      <Image alt={'img'} className={s.img} src={SignInImg} />
    </div>
  )
}
