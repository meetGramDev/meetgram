import { baseApi } from '@/shared/api'

import { ForgotPasswordArgTypes } from '../types/forgotPassword'

export const forgotPasswordService = baseApi.injectEndpoints({
  endpoints: builder => ({
    forgotPassword: builder.mutation<any, ForgotPasswordArgTypes>({
      query: args => ({
        body: args,
        method: 'POST',
        url: '/auth/password-recovery',
      }),
    }),
  }),
})

export const { useForgotPasswordMutation } = forgotPasswordService
