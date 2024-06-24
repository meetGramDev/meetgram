import { useState } from 'react'

import { ForgotPasswordForm, useForgotPasswordMutation } from '@/features/auth/forgotPassword'
import { ForgotPasswordFormData } from '@/features/auth/forgotPassword/lib/useForgotPassword'
import { Nullable } from '@/shared/types'
import { Button } from '@/shared/ui/button/button'
import { Dialog } from '@/shared/ui/dialog'
import { getAuthLayout } from '@/widgets/layouts'

const ForgotPassword = () => {
  const [trigger, setTrigger] = useState<boolean>(false)
  const [forgotPassword, {}] = useForgotPasswordMutation()

  const onSubmit = (data: { token: Nullable<string> } & ForgotPasswordFormData) => {
    forgotPassword({
      baseUrl: 'http://localhost:3000/',
      email: data.email,
      recaptcha: data.token as string,
    }).then(res => {
      setTrigger(true)
    })
  }

  return (
    <div>
      <ForgotPasswordForm onSubmit={onSubmit} />
      <Dialog onOpenChange={setTrigger} open={trigger} title={'Email sent'}>
        <div>We have sent a link to confirm your email to ____email_____</div>
        <Button onClick={() => setTrigger(false)} variant={'primary'}>
          OK
        </Button>
      </Dialog>
    </div>
  )
}

ForgotPassword.getLayout = getAuthLayout

export default ForgotPassword
