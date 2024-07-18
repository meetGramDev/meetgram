import { useState } from 'react'

import { setCredentials } from '@/entities/user'
import { SignInFields, SignInForm, useLoginMutation } from '@/features/auth/signIn'
import { ServerMessagesType } from '@/shared/api'
import { PROFILE } from '@/shared/config/router'
import { useAppDispatch } from '@/shared/config/storeHooks'
import { serverErrorHandler, useClientProgress } from '@/shared/lib'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'
import { useRouter } from 'next/router'

const SignIn: NextPageWithLayout = () => {
  const [login, { isLoading }] = useLoginMutation()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [error, setError] = useState<ServerMessagesType[] | string>('')

  useClientProgress(isLoading)

  const handleSubmitForm = async function (data: SignInFields) {
    try {
      setError('')

      const accessToken = await login(data).unwrap()

      dispatch(setCredentials(accessToken))

      router.push(PROFILE)
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
