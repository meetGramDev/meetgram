import { setCredentials } from '@/entities/user'
import { baseApi } from '@/shared/api'
import { nextSessionApi } from '@/shared/api/_next-auth'
import { StatusCode } from '@/shared/enum'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { ArgsLogin, SignInSuccessResponse } from '../types/services'

export const loginApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<string, ArgsLogin>({
      queryFn: async (_args, _queryApi, _extraOptions, baseQuery) => {
        const loginResp = await baseQuery({ body: _args, method: 'POST', url: '/auth/login' })

        if (loginResp.error) {
          return { error: loginResp.error as FetchBaseQueryError }
        }
        const accessToken = (loginResp.data as SignInSuccessResponse).accessToken

        const sessionRes = await nextSessionApi.makeSession(accessToken)

        if (sessionRes.status === StatusCode.Success) {
          _queryApi.dispatch(setCredentials({ accessToken }))

          return { data: 'Successfully logged in' }
        } else {
          return {
            error: {
              data: sessionRes.data,
              status: sessionRes.status,
            } as FetchBaseQueryError,
          }
        }
      },
    }),
  }),
})

export const { useLoginMutation } = loginApi
