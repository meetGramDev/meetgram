import { useEffect } from 'react'

import { GithubBtn, GoogleBtn } from '@/features/auth/by-oauth'
import { Tr } from '@/hooks/useLangSwitcher'
import { FORGOT_PASSWORD, SIGN_UP } from '@/shared/config/router'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input/input'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { SignInFields, useSignIn } from '../lib/useSignIn'

type Props = {
  error?: string
  onSubmit: (data: SignInFields) => void
}

export const SignInForm = ({ error, onSubmit }: Props) => {
  const {
    formState: { errors, isDirty, isValid },
    getValues,
    handleSubmit,
    register,
    setError,
  } = useSignIn()

  const locale = useRouter().locale
  const { signInLang } = Tr(locale)

  useEffect(() => {
    if (error) {
      let value: keyof SignInFields

      for (value in getValues()) {
        setError(value, { message: error })
      }
    }
  }, [error, setError, getValues])

  return (
    <Card className={'min-w-[22.5rem] p-6 text-regular16 text-light-100'}>
      <h2 className={'mb-3 text-center text-h1 font-bold'}>{signInLang.signIn}</h2>
      <div className={'mb-6 flex justify-center gap-9'}>
        <GoogleBtn />
        <GithubBtn />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'mb-9 flex flex-col gap-6'}>
          <Input
            error={errors.email?.message}
            label={'Email'}
            placeholder={'example@email.com'}
            type={'text'}
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          <Input
            error={errors.password?.message}
            label={'Password'}
            type={'password'}
            {...register('password')}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
        </div>
        <div className={'mb-6 text-right text-regular14 capitalize text-light-900'}>
          <Link href={FORGOT_PASSWORD}>{signInLang.forgoPassword}</Link>
        </div>
        <div className={'flex flex-col items-center gap-4'}>
          <Button disabled={!isDirty || !isValid} fullWidth type={'submit'} variant={'primary'}>
            {signInLang.signIn}
          </Button>
          <p className={'text-regular16'}>{signInLang.anAccount}</p>
          <Button
            as={Link}
            href={SIGN_UP}
            style={{ fontWeight: 600, textDecoration: 'none' }}
            variant={'link'}
          >
            {signInLang.signUp}
          </Button>
        </div>
      </form>
    </Card>
  )
}
