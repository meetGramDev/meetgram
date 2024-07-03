import { useState } from 'react'

import { ForgotPasswordForm, useForgotPasswordMutation } from '@/features/auth/forgotPassword'
import { ForgotPasswordDataType } from '@/features/auth/forgotPassword/ui/ForgotPasswordForm'
import { ServerBadResponse } from '@/shared/api'
import { isErrorWithMessage, isFetchBaseQueryError } from '@/shared/types'
import { Button } from '@/shared/ui'
import { Dialog } from '@/shared/ui/dialog'
import { getAuthLayout } from '@/widgets/layouts'

import s from './index.module.scss'

type ErrorType = {
  field: string
  message: string
}

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()
  const [trigger, setTrigger] = useState<boolean>(false)
  const [isFormSended, setIsFormSended] = useState<boolean>(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState<ErrorType[]>([])

  const onSubmit = async (data: ForgotPasswordDataType) => {
    setEmail(data.email)

    try {
      await forgotPassword({
        baseUrl: data.baseUrl,
        email: data.email,
        recaptcha: data.token as string,
      }).unwrap()
      setTrigger(true)
      setIsFormSended(true)
    } catch (e) {
      if (isFetchBaseQueryError(e)) {
        const errMsg =
          'error' in e ? e.error : JSON.stringify((e.data as ServerBadResponse).messages)

        try {
          setError(JSON.parse(errMsg))
        } catch (parseError) {
          setError([{ field: 'email', message: errMsg }])
        }
      } else if (isErrorWithMessage(e)) {
        setError([{ field: 'email', message: e.message }])
      }
    }
  }

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <div>
      <ForgotPasswordForm error={error} isFormSended={isFormSended} onSubmit={onSubmit} />
      <Dialog
        className={s.dislogTitle}
        onOpenChange={setTrigger}
        open={trigger}
        title={'Email sent'}
      >
        <div
          style={{
            alignItems: 'end',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '30px 24px 36px 24px',
          }}
        >
          <span
            style={{ maxWidth: '328px', textAlign: 'start' }}
          >{`We have sent a link to confirm your email to ${email}`}</span>
          <div style={{ marginTop: '18px' }}>
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
