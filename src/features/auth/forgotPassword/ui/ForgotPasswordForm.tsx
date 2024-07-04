import { useRef, useState } from 'react'
//eslint-disable-next-line
import ReCAPTCHA from 'react-google-recaptcha'
import { UseFormSetError } from 'react-hook-form'

import { translate } from '@/shared/lib/langSwitcher'
import { Nullable } from '@/shared/types'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input/input'
import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './forgotPassword.module.scss'

import { ForgotPasswordFormData, useForgotPassword } from '../lib/useForgotPassword'

type ForgotPasswordType = {
  onSubmit: (
    data: {
      baseUrl?: string
      setError: UseFormSetError<{ email: string }>
      setIsSentLink: (value: boolean) => void
      token: Nullable<string>
    } & ForgotPasswordFormData
  ) => void
}

export const ForgotPasswordForm = ({ onSubmit }: ForgotPasswordType) => {
  const [token, setToken] = useState<null | string>(null)

  const [isSentLink, setIsSentLink] = useState(false)

  const captchaRef = useRef<any>()

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
  const { locale } = useRouter()

  const { errorsTr, forgoPasswordForm } = translate(locale)
  const { errorEmail } = errorsTr
  const { errors, handleSubmit, register, setError } = useForgotPassword(errorEmail)

  const siteKey = process.env.captchaSiteKey as string

  const onSubmitHandler = handleSubmit(data => {
    onSubmit({
      baseUrl: 'http://localhost:3000/',
      email: data.email,
      setError,
      setIsSentLink,
      token,
    })
    captchaRef?.current?.reset()
  })

  return (
    <Card className={classNames.card}>
      <h1 className={classNames.title}>{forgoPasswordForm.forgotPassword}</h1>
      <form className={classNames.form} onSubmit={onSubmitHandler}>
        <Input
          className={classNames.input}
          label={forgoPasswordForm.email}
          {...register('email')}
          error={errors.email?.message}
          placeholder={'Google@gmail.com'}
        />
        <div className={classNames.text}>{forgoPasswordForm.enterEmail}</div>
        {isSentLink && (
          <div className={classNames.hiddenText}>
            {forgoPasswordForm.linkSent}
            <br />
            {forgoPasswordForm.sendAgain}
          </div>
        )}
        <Button className={classNames.button} fullWidth type={'submit'} variant={'primary'}>
          {!isSentLink
            ? forgoPasswordForm.sendLink
            : forgoPasswordForm.sendLink + forgoPasswordForm.again}
        </Button>
      </form>
      <Button as={Link} className={classNames.btnLink} href={'/sign-in'} variant={'link'}>
        {forgoPasswordForm.backSignIn}
      </Button>

      <div className={classNames.recaptcha}>
        <ReCAPTCHA
          hl={locale}
          onChange={setToken}
          ref={captchaRef}
          sitekey={siteKey}
          theme={'dark'}
        />
      </div>
    </Card>
  )
}
