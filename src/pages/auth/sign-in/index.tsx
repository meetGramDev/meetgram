import { useState } from 'react'

import { SignInFields, SignInForm, useLoginMutation } from '@/features/auth/signIn'
import { ServerMessagesType } from '@/shared/api'
import { PROFILE } from '@/shared/config/router'
import { serverErrorHandler, useClientProgress } from '@/shared/lib'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'
import { useRouter } from 'next/router'

const SignIn: NextPageWithLayout = () => {
  const [login, { isLoading }] = useLoginMutation()
  const router = useRouter()

  const [error, setError] = useState<ServerMessagesType[] | string>('')

  useClientProgress(isLoading)

  const handleSubmitForm = async function (data: SignInFields) {
    try {
      setError('')

      await login(data).unwrap()

      router.push(PROFILE, undefined, { locale: router.locale })
    } catch (error) {
      const err = serverErrorHandler(error)

      setError(err)
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
