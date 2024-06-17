import { baseApi } from '@/shared/api'

import { SignUpArgs } from '../types/signUp'

export const signUpService = baseApi.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<any, SignUpArgs>({
      query: args => ({
        body: args,
        method: 'POST',
        url: '/auth/registration',
      }),
    }),
  }),
})

export const { useSignUpMutation } = signUpService
