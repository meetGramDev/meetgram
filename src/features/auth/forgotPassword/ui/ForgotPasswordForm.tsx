import { useEffect, useRef, useState } from 'react'
//eslint-disable-next-line
import ReCAPTCHA from 'react-google-recaptcha'

import { Nullable } from '@/shared/types'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input/input'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './forgotPassword.module.scss'

import { ForgotPasswordFormData, useForgotPassword } from '../lib/useForgotPassword'
type ErrorType = {
  field: string
  message: string
}
export type ForgotPasswordDataType = {
  baseUrl?: string
  setIsSentLink: (value: boolean) => void
  token: Nullable<string>
} & ForgotPasswordFormData

type ForgotPasswordType = {
  error?: ErrorType[]
  onSubmit: (data: ForgotPasswordDataType) => void
}

export const ForgotPasswordForm = ({ error, onSubmit }: ForgotPasswordType) => {
  const [token, setToken] = useState<null | string>(null)

  const [isSentLink, setIsSentLink] = useState(false)

  const captchaRef = useRef<any>()
  const baseURL = 'http://localhost:3000/'

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

  useEffect(() => {
    type fieldKeys = keyof ForgotPasswordFormData
    if (error) {
      for (const e of error) {
        setError(`${e.field as fieldKeys}`, { message: e.message })
      }
    }
  }, [error, setError])

  const siteKey = process.env.captchaSiteKey as string

  const onSubmitHandler = handleSubmit(data => {
    onSubmit({
      baseUrl: baseURL,
      email: data.email,
      setIsSentLink,
      token,
    })
    captchaRef?.current?.reset()
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
        {isSentLink && (
          <div className={classNames.hiddenText}>
            The link has been sent by email.
            <br />
            If you do not receive an email send link again.
          </div>
        )}
        <Button
          className={classNames.button}
          disabled={token === null}
          fullWidth
          type={'submit'}
          variant={'primary'}
        >
          {!isSentLink ? 'Send Link' : 'Send Link Again'}
        </Button>
      </form>

      <Button as={Link} className={classNames.btnLink} href={'/sign-in'} variant={'link'}>
        Back to Sign In
      </Button>

      <div className={classNames.recaptcha}>
        <ReCAPTCHA
          hl={'en'}
          onChange={setToken}
          ref={captchaRef}
          sitekey={siteKey}
          theme={'dark'}
        />
      </div>
    </Card>
  )
}
