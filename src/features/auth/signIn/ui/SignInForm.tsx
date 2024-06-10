import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input/input'
import Link from 'next/link'

export const SignInForm = () => {
  return (
    <Card className={'p-6 text-regular16 text-light-100'}>
      <h1 className={'text-center text-h1 font-bold'}>Sign In</h1>
      <div className={'mb-9 flex flex-col gap-6'}>
        <Input label={'Email'} placeholder={'example@email.com'} type={'text'} />
        <Input label={'Password'} type={'password'} />
      </div>
      <div className={'mb-6 text-right text-regular14 capitalize text-light-900'}>
        <Link href={'/forgot-password'}>Forgot password</Link>
      </div>
      <div className={'flex flex-col items-center'}>
        <Button fullWidth variant={'primary'}>
          Sign In
        </Button>
        <p className={'mb-2 mt-5 text-regular16'}>Don&apos;t have an account?</p>
        <Button as={Link} href={'/sign-up'} variant={'link'}>
          <span className={'font-semibold'}>Sign Up</span>
        </Button>
      </div>
    </Card>
  )
}
