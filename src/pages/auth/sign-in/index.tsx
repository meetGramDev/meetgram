import { useState } from 'react'

import { SignInFields, SignInForm, useLoginMutation } from '@/features/auth/signIn'
import { PROFILE } from '@/shared/config/router'
import { useClientProgress } from '@/shared/lib'
import {
  NextPageWithLayout,
  isErrorWithMessage,
  isFetchBaseQueryError,
  isServerBadResponseError,
} from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'
import { useRouter } from 'next/router'

const SignIn: NextPageWithLayout = () => {
  const [login, { isLoading }] = useLoginMutation()
  const router = useRouter()

  const [error, setError] = useState('')

  useClientProgress(isLoading)

  const handleSubmitForm = async function (data: SignInFields) {
    try {
      setError('')

      await login(data).unwrap()

      router.push(PROFILE, undefined, { locale: router.locale })
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        let errMsg: string = ''

        if ('error' in error) {
          errMsg = 'Network error'
        } else if (isServerBadResponseError(error)) {
          switch (error.data.statusCode) {
            case 400:
              if (typeof error.data.messages === 'string') {
                errMsg = error.data.messages
              }
              break
            case 404:
              errMsg = 'Invalid server request'
              break
            default:
              errMsg = 'Some error was occurred'
              break
          }
        }
        setError(errMsg)
      } else if (isErrorWithMessage(error)) {
        setError(error.message)
      }
    }
  }

  return (
    <SignInForm
      error={error}
      onSubmit={data => {
        handleSubmitForm(data)
      }}
    />
  )
}

SignIn.getLayout = getAuthLayout

export default SignIn
