import { useRef } from 'react'
import { ReCAPTCHA } from 'react-google-recaptcha'

import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input/input'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './forgotPassword.module.scss'

import { ForgotPasswordFormData, useForgotPassword } from './useForgotPassword'

type ForgotPasswordType = {
  onSubmit: (data: ForgotPasswordFormData) => void
}

export const ForgotPasswordForm = ({ onSubmit }: ForgotPasswordType) => {
  const classNames = {
    btnLink: clsx(s.bntLink),
    button: clsx(s.button),
    card: clsx(s.card),
    form: clsx(s.form),
    input: clsx(s.input),
    recaptcha: clsx(s.captcha),
    text: clsx(s.text),
    title: clsx(s.title),
  }

  const captchaRef = useRef<null | string>(null)

  const { errors, handleSubmit, register, setError } = useForgotPassword()

  const siteKey = '6Le9h_IpAAAAAF6U0_jL6SNQKTXC_IuBTp-5ksOr'

  // const onSubmitt = (event: any) => {
  //   console.log('email', event)
  //   console.log('token', captchaRef.current.token)
  // }

  return (
    <Card className={classNames.card}>
      <h1 className={classNames.title}>Forgot Password</h1>
      <form className={classNames.form} onSubmit={handleSubmit(onSubmit)}>
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
        <Button className={classNames.button} fullWidth type={'submit'} variant={'primary'}>
          Send Link
        </Button>
        <Button as={Link} className={classNames.btnLink} href={'#'} variant={'link'}>
          Back to Sign In
        </Button>
        <div className={classNames.recaptcha}>
          <ReCAPTCHA
            hl={'en'}
            onChange={token => {
              // captchaRef.current = { token }
              return { ...register('captchaToken') }
            }}
            sitekey={siteKey}
            theme={'dark'}
          />
        </div>
      </form>
    </Card>
  )
}
