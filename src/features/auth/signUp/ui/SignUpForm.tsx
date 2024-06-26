'use client'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

import { GithubBtn, GoogleBtn } from '@/features/auth/by-oauth'
import { authSliceActions, getEmail, useSignUpMutation } from '@/features/auth/signUp'
import { Tr } from '@/hooks/useLangSwitcher'
import { PRIVACY_POLICY, SIGN_IN, TERMS_OF_SERVICE } from '@/shared/config/router'
import { useAppDispatch, useAppSelector } from '@/shared/config/storeHooks'
import { Button } from '@/shared/ui'
import { Card } from '@/shared/ui/card'
import { Checkbox } from '@/shared/ui/checkbox'
import { Dialog } from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input/input'
import { clsx } from 'clsx'
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

  const { signUpLang } = Tr(locale)

  return (
    <>
      <Card className={s.card}>
        <h3 className={s.title}>{signUpLang.signUp}</h3>
        <div className={s.iconWrapper}>
          <GoogleBtn />
          <GithubBtn />
        </div>
        <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
          <Input
            error={errors.userName?.message}
            label={signUpLang.username}
            {...register('userName')}
          />
          <Input error={errors.email?.message} label={signUpLang.email} {...register('email')} />
          <Input
            error={errors.password?.message}
            label={signUpLang.password}
            type={'password'}
            {...register('password')}
          />
          <Input
            error={errors.confirmPassword?.message}
            label={signUpLang.passwordConf}
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
                      message: signUpLang.message,
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
              {signUpLang.IAgree}{' '}
              <Button as={Link} className={s.info} href={TERMS_OF_SERVICE} variant={'link'}>
                {signUpLang.termServ}
              </Button>{' '}
              {signUpLang.and}{' '}
              <Button as={Link} className={s.info} href={PRIVACY_POLICY} variant={'link'}>
                {signUpLang.privPolicy}
              </Button>
            </span>
            {isApprovedError && <div className={s.checkboxError}>{isApprovedError}</div>}
          </div>
          <Button disabled={!isDirty || !isValid} fullWidth type={'submit'}>
            {signUpLang.signUp}
          </Button>
        </form>
        <div style={{ textAlign: 'center' }}>{signUpLang.anAccount}</div>
        <Button as={Link} className={s.link} href={SIGN_IN} variant={'link'}>
          {signUpLang.signIn}
        </Button>
      </Card>
      <>
        <Dialog onOpenChange={setOpen} open={open} title={'Email sent'}>
          <div className={s.modalContent}>
            <div>
              {signUpLang.aler}
              {email}
            </div>
            <Button onClick={() => setOpen(false)} style={{ alignSelf: 'flex-end' }}>
              Ok
            </Button>
          </div>
        </Dialog>
      </>
    </>
  )
}
