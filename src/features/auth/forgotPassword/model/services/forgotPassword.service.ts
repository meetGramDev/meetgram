import { baseApi } from '@/shared/api'

import { ForgotPasswordArgTypes } from '../types/forgotPassword'

export const forgotPasswordService = baseApi.injectEndpoints({
  endpoints: builder => ({
    addNewPassword: builder.mutation<void, { newPassword: string; recoveryCode: string }>({
      query: args => ({
        body: args,
        method: 'POST',
        url: '/auth/new-password',
      }),
    }),
    checkRecoveryCode: builder.mutation<{ email: string }, { recoveryCode: string }>({
      query: arg => ({
        body: arg,
        method: 'POST',
        url: '/auth/check-recovery-code',
      }),
    }),
    forgotPassword: builder.mutation<void, ForgotPasswordArgTypes>({
      query: args => ({
        body: args,
        method: 'POST',
        url: '/auth/password-recovery',
      }),
    }),
  }),
})

export const {
  useAddNewPasswordMutation,
  useCheckRecoveryCodeMutation,
  useForgotPasswordMutation,
} = forgotPasswordService
