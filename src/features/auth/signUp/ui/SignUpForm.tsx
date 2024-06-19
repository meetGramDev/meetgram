import { Tr } from '@/hooks/useLangSwitcher'
import githubIcon from '@/shared/assets/icons/github-icon.svg'
import googleIcon from '@/shared/assets/icons/google-icon.svg'
import { PRIVACY_POLICY, SIGN_IN, TERMS_OF_SERVICE } from '@/shared/config/router'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input/input'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './signUpForm.module.scss'

import { SignUpFormData, useSignUp } from './useSignUp'

type Props = {
  onSubmit: (data: SignUpFormData) => void
}

export const SignUpForm = ({ onSubmit }: Props) => {
  const { locale } = useRouter()
  const { errors, handleSubmit, register } = useSignUp()

  const { sign_up } = Tr(locale)

  return (
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
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={errors.username?.message}
          label={sign_up.username}
          {...register('username')}
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
        <Button fullWidth type={'submit'}>
          {sign_up.sign_up}
        </Button>
      </form>
      <div style={{ textAlign: 'center' }}>{sign_up.an_account}</div>
      <Button as={Link} className={s.link} href={SIGN_IN} variant={'link'}>
        {sign_up.sign_in}
      </Button>
    </Card>
  )
}
