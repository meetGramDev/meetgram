import { baseApi } from '@/shared/api'

import { ArgsLogin, SignInSuccessResponse } from './types'

export const loginApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<SignInSuccessResponse, ArgsLogin>({
      query: args => ({
        body: args,
        method: 'POST',
        url: '/auth/login',
      }),
    }),
  }),
})

export const { useLoginMutation } = loginApi
