import { useState } from 'react'

import { setCredentials } from '@/entities/user'
import { SignInFields, SignInForm, useLoginMutation } from '@/features/auth/signIn'
import { ServerBadResponse } from '@/shared/api'
import { PROFILE } from '@/shared/config/router'
import { useAppDispatch } from '@/shared/config/storeHooks'
import { NextPageWithLayout, isErrorWithMessage, isFetchBaseQueryError } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'
import { useRouter } from 'next/router'

const SignIn: NextPageWithLayout = () => {
  const [login, { isLoading }] = useLoginMutation()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [error, setError] = useState('')

  const handleSubmitForm = async function (data: SignInFields) {
    try {
      setError('')

      const accessToken = await login(data).unwrap()

      dispatch(setCredentials(accessToken))

      router.push(PROFILE)
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
