import { useState } from 'react'

import { ForgotPasswordForm, useForgotPasswordMutation } from '@/features/auth/forgotPassword'
import { ForgotPasswordFormData } from '@/features/auth/forgotPassword/lib/useForgotPassword'
import { ServerBadResponse } from '@/shared/api'
import { Nullable, isFetchBaseQueryError } from '@/shared/types'
import { Button } from '@/shared/ui'
import { Dialog } from '@/shared/ui/dialog'
import { getAuthLayout } from '@/widgets/layouts'

type ErrorType = {
  field: string
  message: string
}

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()
  const [trigger, setTrigger] = useState<boolean>(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState<ErrorType[]>([])

  const onSubmit = async (
    data: {
      baseUrl?: string
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
    } catch (e) {
      if (isFetchBaseQueryError(e)) {
        const errMsg =
          'error' in e ? e.error : JSON.stringify((e.data as ServerBadResponse).messages)

        try {
          const parsedError = JSON.parse(errMsg)

          // Check if parsedError is a string
          if (typeof parsedError === 'string') {
            setError([{ field: 'email', message: errMsg }])
          } else {
            setError(parsedError)
          }
        } catch (parseError) {
          console.error('Failed to parse error message:', parseError)
          setError([{ field: 'email', message: errMsg }])
        }
      }
    }
  }

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <div>
      <ForgotPasswordForm error={error} onSubmit={onSubmit} />
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
