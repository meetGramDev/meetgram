import { baseApi } from '@/shared/api'

import { ArgsLogin, SignInSuccessResponse } from './loginApiSlice.types'

export const loginApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<SignInSuccessResponse, ArgsLogin>({
      query: args => ({
        body: { ...args },
        method: 'POST',
        url: '/auth/login',
      }),
    }),
  }),
  // reducerPath: 'loginApi',
  // tagTypes: ['Login'],
})

export const { useLoginMutation } = loginApi
