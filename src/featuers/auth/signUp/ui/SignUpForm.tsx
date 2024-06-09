import githubIcon from '@/shared/assets/icons/github-icon.svg'
import googleIcon from '@/shared/assets/icons/google-icon.svg'
import { Button } from '@/shared/ui/button/button'
import { Input } from '@/shared/ui/input/input'
import Image from 'next/image'
import Link from 'next/link'

import s from './signUpForm.module.scss'

type Props = {
  onSubmit?: (data: unknown) => void
}

export const SignUpForm = ({ onSubmit }: Props) => {
  const submitFormHandler = (data: unknown) => {
    console.log(data)
  }

  return (
    <div className={s.card}>
      <h3 className={s.title}>Sign Up</h3>
      <form className={s.form} onSubmit={submitFormHandler}>
        <div className={s.iconWrapper}>
          <Image alt={'googleIcon'} className={s.icon} src={googleIcon} />
          <Image alt={'githubIcon'} className={s.icon} src={githubIcon} />
        </div>
        <Input label={'Username'} />
        <Input label={'Email'} />
        <Input label={'Password'} type={'password'} />
        <Input label={'Password confirmation'} type={'password'} />
        <span className={s.info}>I agree to the Terms of Service and Privacy Policy</span>
        <Button fullWidth type={'submit'}>
          Sign Up
        </Button>
      </form>
      <div style={{ textAlign: 'center' }}>Do you have an account?</div>
      <Button as={Link} className={s.link} href={'/sign-in'} variant={'link'}>
        Sign In
      </Button>
    </div>
  )
}
