import ReCAPTCHA from 'react-google-recaptcha'

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
    input: clsx(s.input),
    text: clsx(s.text),
    title: clsx(s.title),
  }

  const { errors, handleSubmit, register } = useForgotPassword()

  const siteKey = '6Le9h_IpAAAAAF6U0_jL6SNQKTXC_IuBTp-5ksOr'

  const onChange = (value: any) => {
    console.log('CaptchaValue', value)
  }

  return (
    <Card className={classNames.card}>
      <h1 className={classNames.title}>Forgot Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <ReCAPTCHA lang={'en'} onSubmit={onChange} sitekey={siteKey} theme={'dark'} />
      </form>
    </Card>
  )
}
