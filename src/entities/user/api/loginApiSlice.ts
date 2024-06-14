import { baseApi } from '@/shared/api'

import { ArgsLogin } from './loginApiSlice.types'

export const loginApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<any, ArgsLogin>({
      query: args => ({
        body: { args },
        method: 'POST',
        url: '/auth/login',
      }),
    }),
  }),
  // reducerPath: 'loginApi',
  // tagTypes: ['Login'],
})

export const { useLoginMutation } = loginApi
