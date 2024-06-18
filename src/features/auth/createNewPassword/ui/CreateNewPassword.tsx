import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input/input'

type PropsType = {
  onSubmit: (data: any) => void
}

export const CreateNewPassword = ({ onSubmit }: PropsType) => {
  return (
    <Card>
      <h1>Create New Password</h1>
      <form>
        <Input label={'New password'} type={'password'} />
        <Input label={'Password confirmation'} type={'password'} />
        <div>Your password must be between 6 and 20 characters</div>
        <Button fullWidth variant={'primary'}>
          Create new password
        </Button>
      </form>
    </Card>
  )
}
