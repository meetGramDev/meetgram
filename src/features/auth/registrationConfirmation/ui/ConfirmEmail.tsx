import React from 'react'

import SignInImg from '@/shared/assets/img/sign-up_bro.png'
import { SIGN_IN } from '@/shared/config/router'
import { Button } from '@/shared/ui'
import Image from 'next/image'
import Link from 'next/link'

import s from './Confirmation.module.scss'

export const ConfirmEmail = () => {
  return (
    <div className={s.root}>
      <div className={s.textWrapper}>
        <h2 className={s.title}>Congratulations!</h2>
        <div>Your email has been confirmed</div>
        <Button as={Link} href={SIGN_IN}>
          Sign In
        </Button>
      </div>
      <Image alt={'img'} className={s.img} src={SignInImg} />
    </div>
  )
}
