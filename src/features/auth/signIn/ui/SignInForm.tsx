import { Tr } from '@/hooks/useLangSwitcher'
import githubIcon from '@/shared/assets/icons/github-icon.svg'
import googleIcon from '@/shared/assets/icons/google-icon.svg'
import { FORGOT_PASSWORD, SIGN_UP } from '@/shared/config/router'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input/input'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { SignInFields, useSignIn } from '../lib'

type Props = {
  onSubmit: (data: SignInFields) => void
}

export const SignInForm = ({ onSubmit }: Props) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useSignIn()

  const locale = useRouter().locale
  const { sign_in } = Tr(locale)

  return (
    <Card className={'min-w-[22.5rem] p-6 text-regular16 text-light-100'}>
      <h2 className={'mb-3 text-center text-h1 font-bold'}>{sign_in.sign_in}</h2>
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
            error={errors.email?.message}
            label={sign_in.email}
            placeholder={'example@email.com'}
            type={'text'}
            {...register('email')}
          />
          <Input
            error={errors.password?.message}
            label={sign_in.password}
            type={'password'}
            {...register('password')}
          />
        </div>
        <div className={'mb-6 text-right text-regular14 capitalize text-light-900'}>
          <Link href={FORGOT_PASSWORD}>{sign_in.forgo_password}</Link>
        </div>
        <div className={'flex flex-col items-center gap-4'}>
          <Button fullWidth type={'submit'} variant={'primary'}>
            {sign_in.sign_in}
          </Button>
          <p className={'text-regular16'}>{sign_in.an_account}</p>
          <Button
            as={Link}
            href={SIGN_UP}
            style={{ fontWeight: 600, textDecoration: 'none' }}
            variant={'link'}
          >
            {sign_in.sign_up}
          </Button>
        </div>
      </form>
    </Card>
  )
}
