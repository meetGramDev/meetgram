import { useState } from 'react'

import { SignInFields, SignInForm, useLoginMutation } from '@/features/auth/signIn'
import { ServerBadResponse } from '@/shared/api'
import { NextPageWithLayout, isErrorWithMessage, isFetchBaseQueryError } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'

const SignIn: NextPageWithLayout = () => {
  const [login, { isLoading }] = useLoginMutation()
  const [error, setError] = useState('')

  const handleSubmitForm = async function (data: SignInFields) {
    try {
      await login(data).unwrap()
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errMsg =
          'error' in error
            ? error.error
            : JSON.stringify((error.data as ServerBadResponse).messages)

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
