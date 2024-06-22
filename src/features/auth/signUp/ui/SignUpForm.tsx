'use client'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

import { authSliceActions, getEmail, useSignUpMutation } from '@/features/auth/signUp'
import { Tr } from '@/hooks/useLangSwitcher'
import githubIcon from '@/shared/assets/icons/github-icon.svg'
import googleIcon from '@/shared/assets/icons/google-icon.svg'
import { PRIVACY_POLICY, SIGN_IN, TERMS_OF_SERVICE } from '@/shared/config/router'
import { useAppDispatch, useAppSelector } from '@/shared/config/storeHooks'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Checkbox } from '@/shared/ui/checkbox'
import { Dialog } from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input/input'
import { clsx } from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './signUpForm.module.scss'

import { SignUpFormData, useSignUp } from '../lib/useSignUp'

type Props = {
  onSubmit: (data: SignUpFormData) => Promise<void>
}

export const SignUpForm = ({ onSubmit }: Props) => {
  const { locale } = useRouter()

  const { clearErrors, control, errors, handleSubmit, isDirty, isValid, register, setError } =
    useSignUp()
  const [signUp] = useSignUpMutation()
  const email = useAppSelector(getEmail)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const isApprovedError = errors.isApproved?.message

  const onSubmitHandler = (data: SignUpFormData) => {
    signUp({ ...data })
      .unwrap()
      .then(() => {
        /*todo check again */
        alert(`${sign_up.aler} ${data.email}`)
        dispatch(authSliceActions.setEmail(data.email))
        setOpen(true)
      })
      .catch(err => {
        const e = err?.data?.messages[0]

        if (e.field === 'email') {
          setError('email', { message: e.message })
        }
        if (e.field === 'userName') {
          setError('userName', { message: e.message })
        }
      })
  }

  const { sign_up } = Tr(locale)

  return (
    <>
      <Card className={s.card}>
        <h3 className={s.title}>{sign_up.sign_up}</h3>
        <div className={s.iconWrapper}>
          <Button variant={'text'}>
            <Image alt={'googleIcon'} className={s.icon} src={googleIcon} />
          </Button>
          <Button variant={'text'}>
            <Image alt={'githubIcon'} className={s.icon} src={githubIcon} />
          </Button>
        </div>
        <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
          <Input
            error={errors.userName?.message}
            label={sign_up.username}
            {...register('userName')}
          />
          <Input error={errors.email?.message} label={sign_up.email} {...register('email')} />
          <Input
            error={errors.password?.message}
            label={sign_up.password}
            type={'password'}
            {...register('password')}
          />
          <Input
            error={errors.confirmPassword?.message}
            label={sign_up.password_conf}
            type={'password'}
            {...register('confirmPassword')}
          />
          <div className={clsx(s.infoWrapper, [isApprovedError && s.infoWrapperWithError])}>
            <Controller
              control={control}
              name={'isApproved'}
              render={({ field: { onChange, value } }) => {
                const onValueChange = (value: boolean) => {
                  if (!value) {
                    setError('isApproved', {
                      message: sign_up.message,
                    })
                  }
                  if (value) {
                    clearErrors('isApproved')
                  }
                  onChange(value)
                }

                return <Checkbox checked={value} onValueChange={onValueChange} />
              }}
            />
            <span className={s.info}>
              {sign_up.I_agree}{' '}
              <Button as={Link} className={s.info} href={TERMS_OF_SERVICE} variant={'link'}>
                {sign_up.term_serv}
              </Button>{' '}
              {sign_up.and}{' '}
              <Button as={Link} className={s.info} href={PRIVACY_POLICY} variant={'link'}>
                {sign_up.priv_policy}
              </Button>
            </span>
            {isApprovedError && <div className={s.checkboxError}>{isApprovedError}</div>}
          </div>
          <Button disabled={!isDirty || !isValid} fullWidth type={'submit'}>
            {sign_up.sign_up}
          </Button>
        </form>
        <div style={{ textAlign: 'center' }}>{sign_up.an_account}</div>
        <Button as={Link} className={s.link} href={SIGN_IN} variant={'link'}>
          {sign_up.sign_in}
        </Button>
      </Card>
      <>
        <Dialog onOpenChange={setOpen} open={open} title={'Email sent'}>
          <div className={s.modalContent}>
            <div>We have sent a link to confirm your email to {email}</div>
            <Button onClick={() => setOpen(false)} style={{ alignSelf: 'flex-end' }}>
              Ok
            </Button>
          </div>
        </Dialog>
      </>
    </>
  )
}
