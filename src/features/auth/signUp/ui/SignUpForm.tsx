import { useEffect } from 'react'
import { Controller } from 'react-hook-form'

import { GithubBtn, GoogleBtn } from '@/features/auth/by-oauth'
import { ServerMessagesType } from '@/shared/api'
import { PRIVACY_POLICY, SIGN_IN, TERMS_OF_SERVICE } from '@/shared/config/router'
import { useChangeZodErrorLang } from '@/shared/lib'
import { translate } from '@/shared/lib/langSwitcher'
import { Button } from '@/shared/ui'
import { Card } from '@/shared/ui/card'
import { Checkbox } from '@/shared/ui/checkbox'
import { Input } from '@/shared/ui/input/input'
import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './signUpForm.module.scss'

import { SignUpFormData, useSignUp } from '../lib/useSignUp'

type Props = {
  error?: ServerMessagesType[]
  onSubmit: (data: SignUpFormData) => void
}

export const SignUpForm = ({ error, onSubmit }: Props) => {
  const { locale } = useRouter()

  const { errorsTr, signUpLang } = translate(locale)

  const {
    clearErrors,
    control,
    errors,
    getValues,
    handleSubmit,
    isDirty,
    isValid,
    register,
    setError,
    touchedFields,
    trigger,
  } = useSignUp(errorsTr)

  const isApprovedError = errors.isApproved?.message

  useEffect(() => {
    type fieldKeys = keyof SignUpFormData

    if (error) {
      for (const e of error) {
        for (const field in getValues()) {
          if (e.field === field) {
            setError(e.field as fieldKeys, { message: e.message })
          }
        }
      }
    }
  }, [error, setError, getValues])

  useChangeZodErrorLang(touchedFields, fieldName => trigger(fieldName))

  return (
    <Card className={s.card}>
      <h3 className={s.title}>{signUpLang.signUp}</h3>
      <div className={s.iconWrapper}>
        <GoogleBtn />
        <GithubBtn />
      </div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={errors.userName?.message}
          label={signUpLang.username}
          {...register('userName')}
        />
        <Input
          error={errors.email?.message}
          label={signUpLang.email}
          type={'email'}
          {...register('email')}
        />
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
            render={({ field: { onChange, value, ...rest } }) => {
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

              return <Checkbox checked={value} onValueChange={onValueChange} {...rest} />
            }}
          />
          <span className={s.info}>
            {signUpLang.IAgree}{' '}
            <Button
              as={Link}
              className={s.info}
              href={TERMS_OF_SERVICE}
              target={'_blank'}
              variant={'link'}
            >
              {signUpLang.termServ}
            </Button>{' '}
            {signUpLang.and}{' '}
            <Button
              as={Link}
              className={s.info}
              href={PRIVACY_POLICY}
              target={'_blank'}
              variant={'link'}
            >
              {signUpLang.privPolicy}
            </Button>
            {isApprovedError && <div className={s.checkboxError}>{isApprovedError}</div>}{' '}
          </span>
        </div>
        <Button disabled={!isDirty || !isValid} fullWidth type={'submit'}>
          {signUpLang.signUp}
        </Button>
      </form>
      <div className={s.hasAccount}>{signUpLang.anAccount}</div>
      <Button as={Link} className={s.link} href={SIGN_IN} variant={'link'}>
        {signUpLang.signIn}
      </Button>
    </Card>
  )
}
