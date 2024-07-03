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
  // setIsSentLink: (value: boolean) => void
  token: Nullable<string>
} & ForgotPasswordFormData

type ForgotPasswordType = {
  error?: ErrorType[]
  isFormSended: boolean
  onSubmit: (data: ForgotPasswordDataType) => void
}

export const ForgotPasswordForm = ({ error, isFormSended, onSubmit }: ForgotPasswordType) => {
  const [token, setToken] = useState<null | string>(null)

  const captchaRef = useRef<any>()
  const baseURL = 'http://localhost:3000/'

  const { errors, handleSubmit, register, setError } = useForgotPassword()

  useEffect(() => {
    // type fieldKeys = keyof ForgotPasswordFormData

    if (error) {
      for (const e of error) {
        // const isSetError = e.field as fieldKeys) ? e.field : 'email'
        setError('email', { message: e.message })
      }
    }
  }, [error, setError])

  const siteKey = process.env.captchaSiteKey as string

  const onSubmitHandler = handleSubmit(data => {
    onSubmit({
      baseUrl: baseURL,
      email: data.email,
      token,
    })
    captchaRef?.current?.reset()
  })

  return (
    <Card className={s.card}>
      <h1 className={s.title}>Forgot Password</h1>
      <form className={s.form} onSubmit={onSubmitHandler}>
        <Input
          className={s.input}
          label={'Email'}
          {...register('email')}
          error={errors.email?.message}
          placeholder={'Google@gmail.com'}
        />
        <div className={s.text}>Enter your email and we will send you further instruction</div>
        {isFormSended && (
          <div className={s.hiddenText}>
            The link has been sent by email.
            <br />
            If you do not receive an email send link again.
          </div>
        )}
        <Button
          className={s.button}
          disabled={token === null}
          fullWidth
          type={'submit'}
          variant={'primary'}
        >
          {!isFormSended ? 'Send Link' : 'Send Link Again'}
        </Button>
      </form>

      <Button as={Link} className={s.bntLink} href={'/sign-in'} variant={'link'}>
        Back to Sign In
      </Button>

      <div className={s.captcha}>
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
