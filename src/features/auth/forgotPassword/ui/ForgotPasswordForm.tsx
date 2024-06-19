import { useState } from 'react'
//eslint-disable-next-line
import ReCAPTCHA from 'react-google-recaptcha'

import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input/input'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './forgotPassword.module.scss'

import { ForgotPasswordFormData, useForgotPassword } from '../lib/useForgotPassword'

type ForgotPasswordType = {
  onSubmit: (data: { token: null | string } & ForgotPasswordFormData) => void
}

export const ForgotPasswordForm = ({ onSubmit }: ForgotPasswordType) => {
  const [token, setToken] = useState<null | string>(null)
  const [sentLink, setSentLink] = useState<boolean>(false)

  const classNames = {
    btnLink: clsx(s.bntLink),
    button: clsx(s.button),
    card: clsx(s.card),
    form: clsx(s.form),
    hiddenText: s.hiddenText,
    input: clsx(s.input),
    recaptcha: clsx(s.captcha),
    text: clsx(s.text),
    title: clsx(s.title),
  }

  const { errors, handleSubmit, register, setError } = useForgotPassword()

  const siteKey: string = process.env.captchaSiteKey
    ? process.env.captchaSiteKey
    : '6Le9h_IpAAAAAF6U0_jL6SNQKTXC_IuBTp-5ksOr'

  const onSubmitHandler = handleSubmit(data => {
    onSubmit({ email: data.email, token: token })
    data && token && setSentLink(true)
  })

  return (
    <Card className={classNames.card}>
      <h1 className={classNames.title}>Forgot Password</h1>
      <form className={classNames.form} onSubmit={onSubmitHandler}>
        <Input
          className={classNames.input}
          label={'Email'}
          {...register('email')}
          error={errors.email?.message}
          placeholder={'Google@gmail.com'}
        />
        <div className={classNames.text}>
          Enter your email and we will send you further instruction
        </div>
        {sentLink && (
          <div className={classNames.hiddenText}>
            The link has been sent by email.
            <br />
            If you do not receive an email send link again.
          </div>
        )}
        <Button className={classNames.button} fullWidth type={'submit'} variant={'primary'}>
          {!sentLink ? 'Send Link' : 'Send Link Again'}
        </Button>
      </form>

      <Button as={Link} className={classNames.btnLink} href={'#'} variant={'link'}>
        Back to Sign In
      </Button>
      {!sentLink && (
        <div className={classNames.recaptcha}>
          <ReCAPTCHA
            hl={'en'}
            onChange={token => setToken(token)}
            sitekey={siteKey}
            theme={'dark'}
          />
        </div>
      )}
    </Card>
  )
}
