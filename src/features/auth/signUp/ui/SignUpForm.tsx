import githubIcon from '@/shared/assets/icons/github-icon.svg'
import googleIcon from '@/shared/assets/icons/google-icon.svg'
import { PRIVACY_POLICY, SIGN_IN, TERMS_OF_SERVICE } from '@/shared/config/router'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input/input'
import Image from 'next/image'
import Link from 'next/link'

import s from './signUpForm.module.scss'

import { SignUpFormData, useSignUp } from './useSignUp'

type Props = {
  onSubmit: (data: SignUpFormData) => void
}

export const SignUpForm = ({ onSubmit }: Props) => {
  const { errors, handleSubmit, register } = useSignUp()

  return (
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
        <Input error={errors.username?.message} label={'Username'} {...register('username')} />
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
        <Button fullWidth type={'submit'}>
          Sign Up
        </Button>
      </form>
      <div style={{ textAlign: 'center' }}>Do you have an account?</div>
      <Button as={Link} className={s.link} href={SIGN_IN} variant={'link'}>
        Sign In
      </Button>
    </Card>
  )
}
