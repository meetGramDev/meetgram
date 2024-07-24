import { useState } from 'react'

import { setCredentials, useLazyMeQuery } from '@/entities/user'
import { SignInFields, SignInForm, useLoginMutation } from '@/features/auth/signIn'
import { nextSessionApi } from '@/shared/api/_next-auth'
import { PROFILE } from '@/shared/config/router'
import { useAppDispatch } from '@/shared/config/storeHooks'
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
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [error, setError] = useState('')

  useClientProgress(isLoading)

  const handleSubmitForm = async function (data: SignInFields) {
    try {
      setError('')

      const { accessToken } = await login(data).unwrap()

      await nextSessionApi.makeSession(accessToken)

      dispatch(setCredentials({ accessToken }))
      router.push(router.locale + PROFILE)
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
