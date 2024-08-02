import { useEffect, useState } from 'react'

import { useLazyMeQuery, useMeQuery } from '@/entities/user'
import { SignInFields, SignInForm, useLoginMutation } from '@/features/auth/signIn'
import { ServerMessagesType } from '@/shared/api'
import { PROFILE } from '@/shared/config/router'
import { useAppSelector } from '@/shared/config/storeHooks'
import { serverErrorHandler, useClientProgress } from '@/shared/lib'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'
import { useRouter } from 'next/router'

const SignIn: NextPageWithLayout = () => {
  const [login, { isLoading }] = useLoginMutation()
  const [getMe, meData] = useLazyMeQuery()
  const meId = useAppSelector

  const router = useRouter()

  const [error, setError] = useState<ServerMessagesType[] | string>('')

  useClientProgress(isLoading)

  const handleSubmitForm = async function (data: SignInFields) {
    try {
      setError('')

      await login(data)
        .unwrap()
        .then(async () => {})
      await getMe().unwrap()
    } catch (error) {
      const err = serverErrorHandler(error)

      setError(err)
    }
  }

  useEffect(() => {
    if (meData?.data?.userId) {
      router.push(`${PROFILE}/${meData?.data?.userId}`, undefined, { locale: router.locale })
    }
  }, [meData?.data?.userId])

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
