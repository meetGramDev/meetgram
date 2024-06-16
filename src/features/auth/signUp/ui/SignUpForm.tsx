import { Controller } from 'react-hook-form'

import githubIcon from '@/shared/assets/icons/github-icon.svg'
import googleIcon from '@/shared/assets/icons/google-icon.svg'
import { PRIVACY_POLICY, SIGN_IN, TERMS_OF_SERVICE } from '@/shared/config/router'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Checkbox } from '@/shared/ui/checkbox'
import { Input } from '@/shared/ui/input/input'
import { DevTool } from '@hookform/devtools'
import Image from 'next/image'
import Link from 'next/link'

import s from './signUpForm.module.scss'

import { SignUpFormData, useSignUp } from '../lib/useSignUp'

type Props = {
  emailError?: null | string
  onSubmit: (data: SignUpFormData) => void
  userNameError?: null | string
}

export const SignUpForm = ({ emailError, onSubmit, userNameError }: Props) => {
  const { control, errors, handleSubmit, isDirty, isValid, register, setError } = useSignUp()

  console.log('errors', errors)

  console.log('control', control)

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
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            error={errors.userName?.message || userNameError}
            label={'Username'}
            {...register('userName')}
          />
          <Input
            error={errors.email?.message || emailError}
            label={'Email'}
            {...register('email')}
          />
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
          <div className={s.infoWrapper}>
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
            {errors.isApproved?.message && (
              <div className={s.checkboxError}>{errors.isApproved?.message}</div>
            )}
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
      <DevTool control={control} />
    </>
  )
}
