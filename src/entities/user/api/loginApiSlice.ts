import { BASE_URL } from '@/shared/api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ArgsLogin } from './loginApiSlice.types'

export const loginApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    login: builder.mutation<any, ArgsLogin>({
      query: args => ({
        body: { args },
        method: 'POST',
        url: '/auth/login',
      }),
    }),
  }),
  reducerPath: 'loginApi',
  tagTypes: ['Login'],
})

export const { useLoginMutation } = loginApi
