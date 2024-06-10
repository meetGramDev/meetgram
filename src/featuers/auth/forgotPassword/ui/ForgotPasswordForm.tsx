import { Button } from '@/shared/ui/button/button'
import Card from '@/shared/ui/card/Card'
import { Input } from '@/shared/ui/input/input'

export const ForgotPasswordForm = () => {
  return (
    <Card>
      <h1>Forgot Password</h1>
      <form>
        <Input label={'Email'} placeholder={'Google@gmail.com'} />
        <div>Enter your email and we will send you further instruction</div>
        <Button fullWidth type={'submit'} variant={'primary'}>
          Send Link
        </Button>
      </form>
      <Button as={'Link'} href={'#'} variant={'link'}>
        Back to Sign In
      </Button>
    </Card>
  )
}
