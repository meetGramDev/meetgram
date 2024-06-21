import { useEffect } from 'react'

import githubIcon from '@/shared/assets/icons/github-icon.svg'
import googleIcon from '@/shared/assets/icons/google-icon.svg'
import { FORGOT_PASSWORD, SIGN_UP } from '@/shared/config/router'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input/input'
import Image from 'next/image'
import Link from 'next/link'

import { SignInFields, useSignIn } from '../lib/useSignIn'

type Props = {
  error?: string
  onSubmit: (data: SignInFields) => void
}

export const SignInForm = ({ error, onSubmit }: Props) => {
  const {
    formState: { errors, isDirty, isValid },
    handleSubmit,
    register,
    setError,
  } = useSignIn()

  useEffect(() => {
    if (error) {
      setError('root.serverError', { message: error })
    }
  }, [error, setError])

  return (
    <Card className={'min-w-[22.5rem] p-6 text-regular16 text-light-100'}>
      <h2 className={'mb-3 text-center text-h1 font-bold'}>Sign In</h2>
      <div className={'mb-6 flex justify-center gap-9'}>
        <Button variant={'text'}>
          <Image alt={'Login with google'} height={36} src={googleIcon} width={36} />
        </Button>
        <Button variant={'text'}>
          <Image alt={'Login with github'} height={36} src={githubIcon} width={36} />
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'mb-9 flex flex-col gap-6'}>
          <Input
            error={errors.email?.message || errors.root?.serverError.message}
            label={'Email'}
            placeholder={'example@email.com'}
            type={'text'}
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          <Input
            error={errors.password?.message || errors.root?.serverError.message}
            label={'Password'}
            type={'password'}
            {...register('password')}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
        </div>
        <div className={'mb-6 text-right text-regular14 capitalize text-light-900'}>
          <Link href={FORGOT_PASSWORD}>Forgot password</Link>
        </div>
        <div className={'flex flex-col items-center gap-4'}>
          <Button fullWidth type={'submit'} variant={'primary'}>
            Sign In
          </Button>
          <p className={'text-regular16'}>Don&apos;t have an account?</p>
          <Button
            as={Link}
            disabled={!isDirty || !isValid}
            href={SIGN_UP}
            style={{ fontWeight: 600, textDecoration: 'none' }}
            variant={'link'}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </Card>
  )
}
