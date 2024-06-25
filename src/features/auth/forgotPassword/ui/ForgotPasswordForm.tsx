import { useRef, useState } from 'react'
//eslint-disable-next-line
import ReCAPTCHA from 'react-google-recaptcha'

import { useForgotPasswordMutation } from '@/features/auth/forgotPassword'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Dialog } from '@/shared/ui/dialog'
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

  const [trigger, setTrigger] = useState<boolean>(false)

  const [isSentLink, setIsSentLink] = useState(false)

  const [email, setEmail] = useState('')

  const [forgotPassword, { error }] = useForgotPasswordMutation()

  const captchaRef = useRef()

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

  const siteKey = process.env.captchaSiteKey as string

  const onSubmitHandler = handleSubmit(data => {
    forgotPassword({
      baseUrl: 'http://localhost:3000/',
      email: data.email,
      recaptcha: token as string,
    })
      .unwrap()
      .then(() => {
        setIsSentLink(true)
        setTrigger(true)
        setToken('')
        captchaRef.current.reset()
        setEmail(data.email)
      })
      .catch(error => {
        captchaRef.current.reset()
        const err = error?.data?.messages[0]

        if (err.field === 'email') {
          setError('email', { message: err.message, type: 'custom' })
        }
      })
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
        <Button className={classNames.button} fullWidth type={'submit'} variant={'primary'}>
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

      <Dialog onOpenChange={setTrigger} open={trigger} title={'Email sent'}>
        <div>{`We have sent a link to confirm your email to ${email}`}</div>
        <Button onClick={() => setTrigger(false)} variant={'primary'}>
          OK
        </Button>
      </Dialog>
    </Card>
  )
}
