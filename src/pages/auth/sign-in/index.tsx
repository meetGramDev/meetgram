import { useState } from 'react'

import { useLazyMeQuery, useMeQuery } from '@/entities/user'
import { SignInFields, SignInForm, useLoginMutation } from '@/features/auth/signIn'
import { ServerMessagesType } from '@/shared/api'
import { PROFILE } from '@/shared/config/router'
import { serverErrorHandler, useClientProgress } from '@/shared/lib'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'
import { useRouter } from 'next/router'

const SignIn: NextPageWithLayout = () => {
  const [login, { isLoading }] = useLoginMutation()
  const [getMe, meData] = useLazyMeQuery()

  const router = useRouter()

  const [error, setError] = useState<ServerMessagesType[] | string>('')

  useClientProgress(isLoading)

  const handleSubmitForm = async function (data: SignInFields) {
    try {
      setError('')

      await login(data)
        .unwrap()
        .then(async res => {
          await getMe().then(resp => {
            router.push(`${PROFILE}/${resp?.data?.userId}`, undefined, { locale: router.locale })
          })
        })

      // .then(async res => {
      //   const { data: dataMe } = await getMe()
      //
      //   // if (!dataMe) {
      //   //   return
      //   // }
      //   router.push(`${PROFILE}/${dataMe.userId}`, undefined, { locale: router.locale })
      // })
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
