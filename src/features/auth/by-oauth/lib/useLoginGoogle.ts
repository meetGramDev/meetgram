import { useEffect, useState } from 'react'

import { updateEmail } from '@/entities/user'
import { PROFILE } from '@/shared/config/router'
import { CodeResponse, NonOAuthError, useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

import { useGoogleLoginMutation } from '../api/googleLoginApiSlice'
import { generateCryptoRandomState } from './generateCryptoRandomState'
/**
 * Hook manages all necessary requests to auth with google
 * It uses a useGoogleLogin hook of the react-oauth library
 * @returns callback that can be used in component
 */
export function useLoginGoogle() {
  const [state, setState] = useState('')
  const [getDataFromResourceServer] = useGoogleLoginMutation()
  const router = useRouter()

  const login = useGoogleLogin({
    flow: 'auth-code',
    onError: (errorResponse: { error?: string; error_description?: string; error_uri?: string }) =>
      console.error(`Login failed: ${errorResponse.error}`, errorResponse),

    onNonOAuthError: (nonOAuthErr: NonOAuthError) =>
      console.log(`⛔ Non Auth error ${nonOAuthErr.type}`),

    onSuccess: async (codeResponse: CodeResponse) => {
      console.log('🟢 Success', codeResponse)
      if (state === codeResponse.state) {
        setState('')
        try {
          const resp = await getDataFromResourceServer(codeResponse.code)

          if (!resp.data) {
            throw new Error(resp.error as string)
          }

          localStorage.setItem('accessToken', JSON.stringify(resp.data.accessToken))
          updateEmail(resp.data.email)
          router.push(PROFILE)
        } catch (err) {
          console.log(err)
        }
      } else {
        console.warn('State mismatch. Possible CSRF attack')
      }
    },

    redirect_uri: process.env.NEXT_PUBLIC_OAUTH2_REDIRECT_URL,
    state,
  })

  useEffect(() => setState(generateCryptoRandomState()), [])

  return login
}
