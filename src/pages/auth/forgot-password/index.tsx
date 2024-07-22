import { useState } from 'react'

import {
  ForgotPasswordDataType,
  ForgotPasswordForm,
  useForgotPasswordMutation,
} from '@/features/auth/forgotPassword'
import { ServerBadResponse, ServerMessagesType } from '@/shared/api'
import { isErrorWithMessage, isFetchBaseQueryError } from '@/shared/types'
import { Button } from '@/shared/ui'
import { Dialog } from '@/shared/ui/dialog'
import { getAuthLayout } from '@/widgets/layouts'

import s from './index.module.scss'

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()
  const [trigger, setTrigger] = useState<boolean>(false)
  const [isFormSended, setIsFormSended] = useState<boolean>(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState<ServerMessagesType[]>([])

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
      <Dialog onOpenChange={setTrigger} open={trigger} title={'Email sent'}>
        <div className={s.dialogChildrenWrapper}>
          <span
            className={s.dialogText}
          >{`We have sent a link to confirm your email to ${email}`}</span>
          <div className={s.dialogBtnWrap}>
            <Button
              className={s.dialogButton}
              onClick={() => setTrigger(false)}
              variant={'primary'}
            >
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
