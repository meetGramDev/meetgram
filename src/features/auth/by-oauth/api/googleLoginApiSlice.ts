import { setCredentials } from '@/entities/user'
import { baseApi } from '@/shared/api'
import { nextSessionApi } from '@/shared/api/_next-auth'
import { StatusCode } from '@/shared/enum'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const googleLoginApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    googleLogin: builder.mutation<string, string>({
      invalidatesTags: ['login'],
      queryFn: async (_arg, _queryApi, _extraOptions, baseQuery) => {
        const googleResp = await baseQuery({
          body: { code: _arg },
          method: 'POST',
          url: '/auth/google/login',
        })

        if (googleResp.error) {
          return { error: googleResp.error as FetchBaseQueryError }
        }
        const { accessToken } = googleResp.data as GoogleLoginResponseType
        const sessionRes = await nextSessionApi.makeSession(accessToken)

        if (sessionRes.status === StatusCode.Success) {
          _queryApi.dispatch(setCredentials({ accessToken }))

          return { data: 'Successfully logged in with google' }
        } else {
          return {
            error: { data: sessionRes.data, status: sessionRes.status } as FetchBaseQueryError,
          }
        }
      },
    }),
  }),
})

export const { useGoogleLoginMutation } = googleLoginApi

type GoogleLoginResponseType = {
  accessToken: string
  email: string
}
