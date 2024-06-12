import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input/input'
import Link from 'next/link'

import s from './forgotPassword.module.scss'

export const ForgotPasswordForm = () => {
  const classNames = {
    buttonC: cn('mb-6'),
    link: cn(''),
    subtitle: cn('mb-4 text-sm text-light-900'),
    textField: cn('mb-2'),
    title: cn('text-lg font-bold leading-9 mb-9'),
  }

  return (
    <Card className={s.card}>
      <h1 className={classNames.title}>Forgot Password</h1>
      <form>
        <Input className={classNames.textField} label={'Email'} placeholder={'Google@gmail.com'} />
        <div className={classNames.subtitle}>
          Enter your email and we will send you further instruction
        </div>
        <Button className={classNames.buttonC} fullWidth type={'submit'} variant={'primary'}>
          Send Link
        </Button>
      </form>
      <Button as={Link} className={classNames.link} href={'#'} variant={'link'}>
        Back to Sign In
      </Button>
    </Card>
  )
}
