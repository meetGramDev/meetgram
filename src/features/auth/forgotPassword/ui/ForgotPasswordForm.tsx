import { useEffect, useRef, useState } from 'react'
//eslint-disable-next-line
import ReCAPTCHA from 'react-google-recaptcha'

import { ServerMessagesType } from '@/shared/api'
import { SIGN_IN } from '@/shared/config/router'
import { translate } from '@/shared/lib/langSwitcher'
import { Nullable } from '@/shared/types'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input/input'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './forgotPassword.module.scss'

import { ForgotPasswordFormData, useForgotPassword } from '../lib/useForgotPassword'

export type ForgotPasswordDataType = {
  baseUrl?: string
  token: Nullable<string>
} & ForgotPasswordFormData

export type ForgotPasswordType = {
  error?: ServerMessagesType[]
  isFormSended: boolean
  onSubmit: (data: ForgotPasswordDataType) => void
}

export const ForgotPasswordForm = ({ error, isFormSended, onSubmit }: ForgotPasswordType) => {
  const { locale } = useRouter()
  const [token, setToken] = useState<null | string>(null)

  const captchaRef = useRef<any>()
  const baseURL = 'http://localhost:3000/'

  const { errorsTr, forgoPasswordForm } = translate(locale)

  const { errors, handleSubmit, isDirty, isValid, register, setError } = useForgotPassword({
    InvalidEmail: errorsTr.errorEmail.InvalidEmail,
  })

  useEffect(() => {
    if (error) {
      for (const e of error) {
        setError('email', { message: e.message })
      }
    }
  }, [error, setError])

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
      <h1 className={s.title}>{forgoPasswordForm.forgotPassword}</h1>
      <form className={s.form} onSubmit={onSubmitHandler}>
        <Input
          className={s.input}
          label={forgoPasswordForm.email}
          {...register('email')}
          error={errors.email?.message}
          placeholder={'Google@gmail.com'}
          type={'email'}
        />
        <div className={s.text}>{forgoPasswordForm.enterEmail}</div>
        {isFormSended && (
          <div className={s.hiddenText}>
            {forgoPasswordForm.linkSent}
            <br />
            {forgoPasswordForm.sendAgain}
          </div>
        )}
        <Button
          className={s.button}
          disabled={token === null || !isValid || !isDirty}
          fullWidth
          type={'submit'}
          variant={'primary'}
        >
          {!isFormSended
            ? forgoPasswordForm.sendLink
            : `${forgoPasswordForm.sendLink}${forgoPasswordForm.again}`}
        </Button>
      </form>

      <Button as={Link} className={s.bntLink} href={SIGN_IN} variant={'link'}>
        {forgoPasswordForm.backSignIn}
      </Button>

      <div className={s.captcha}>
        <ReCAPTCHA
          hl={'en'}
          onChange={setToken}
          ref={captchaRef}
          sitekey={String(process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY_ID)}
          theme={'dark'}
        />
      </div>
    </Card>
  )
}
