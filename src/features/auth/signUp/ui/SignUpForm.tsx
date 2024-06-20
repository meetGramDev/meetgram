import { Controller } from 'react-hook-form'

import { useSignUpMutation } from '@/features/auth/signUp'
import githubIcon from '@/shared/assets/icons/github-icon.svg'
import googleIcon from '@/shared/assets/icons/google-icon.svg'
import { PRIVACY_POLICY, SIGN_IN, TERMS_OF_SERVICE } from '@/shared/config/router'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Checkbox } from '@/shared/ui/checkbox'
import { Input } from '@/shared/ui/input/input'
import { clsx } from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import s from './signUpForm.module.scss'

import { SignUpFormData, useSignUp } from '../lib/useSignUp'

type Props = {
  onSubmit: (data: SignUpFormData) => Promise<void>
}

export const SignUpForm = ({ onSubmit }: Props) => {
  const { clearErrors, control, errors, handleSubmit, isDirty, isValid, register, setError } =
    useSignUp()
  const [signUp] = useSignUpMutation()
  const isApprovedError = errors.isApproved?.message

  const onSubmitHandler = (data: SignUpFormData) => {
    signUp({ ...data })
      .unwrap()
      .then(() => {
        alert(`We have sent a link to confirm your email to ${data.email}`)
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

  return (
    <>
      <Card className={s.card}>
        <h3 className={s.title}>Sign Up</h3>
        <div className={s.iconWrapper}>
          <Button variant={'text'}>
            <Image alt={'googleIcon'} className={s.icon} src={googleIcon} />
          </Button>
          <Button variant={'text'}>
            <Image alt={'githubIcon'} className={s.icon} src={githubIcon} />
          </Button>
        </div>
        <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
          <Input error={errors.userName?.message} label={'Username'} {...register('userName')} />
          <Input error={errors.email?.message} label={'Email'} {...register('email')} />
          <Input
            error={errors.password?.message}
            label={'Password'}
            type={'password'}
            {...register('password')}
          />
          <Input
            error={errors.confirmPassword?.message}
            label={'Password confirmation'}
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
                      message: 'Please read and accept the terms and conditions',
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
              I agree to the{' '}
              <Button as={Link} className={s.info} href={TERMS_OF_SERVICE} variant={'link'}>
                Terms of Service
              </Button>{' '}
              and{' '}
              <Button as={Link} className={s.info} href={PRIVACY_POLICY} variant={'link'}>
                Privacy Policy
              </Button>
            </span>
            {isApprovedError && <div className={s.checkboxError}>{isApprovedError}</div>}
          </div>
          <Button disabled={!isDirty || !isValid} fullWidth type={'submit'}>
            Sign Up
          </Button>
        </form>
        <div style={{ textAlign: 'center' }}>Do you have an account?</div>
        <Button as={Link} className={s.link} href={SIGN_IN} variant={'link'}>
          Sign In
        </Button>
      </Card>
    </>
  )
}
