import { useState } from 'react'
import { UseFormSetError } from 'react-hook-form'

import { ForgotPasswordForm, useForgotPasswordMutation } from '@/features/auth/forgotPassword'
import { ForgotPasswordFormData } from '@/features/auth/forgotPassword/lib/useForgotPassword'
import { Nullable } from '@/shared/types'
import { Button } from '@/shared/ui'
import { Dialog } from '@/shared/ui/dialog'
import { getAuthLayout } from '@/widgets/layouts'

const ForgotPassword = () => {
  const [trigger, setTrigger] = useState<boolean>(false)
  const [email, setEmail] = useState('')
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const onSubmit = async (
    data: {
      baseUrl?: string
      setError: UseFormSetError<{ email: string }>
      setIsSentLink: (value: boolean) => void
      token: Nullable<string>
    } & ForgotPasswordFormData
  ) => {
    setEmail(data.email)

    try {
      await forgotPassword({
        baseUrl: data.baseUrl,
        email: data.email,
        recaptcha: data.token as string,
      }).unwrap()

      setTrigger(true)
      data.setIsSentLink(true)
    } catch (e: any) {
      let errorMessage: string | undefined

      if (e.status === 400) {
        errorMessage = e?.data?.messages[0].message
      } else {
        errorMessage = e.error
      }
      data.setError('email', { message: errorMessage, type: 'custom' })
    }
  }

  // if (isLoading) {
  //   return <div>Loading ...</div>
  // }

  return (
    <div>
      <ForgotPasswordForm onSubmit={onSubmit} />
      <Dialog onOpenChange={setTrigger} open={trigger} title={'Email sent'}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span
            style={{ maxWidth: '328px', textAlign: 'start' }}
          >{`We have sent a link to confirm your email to ${email}`}</span>
          <div>
            <Button onClick={() => setTrigger(false)} variant={'primary'}>
              OK
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

ForgotPassword.getLayout = getAuthLayout

export default ForgotPassword
