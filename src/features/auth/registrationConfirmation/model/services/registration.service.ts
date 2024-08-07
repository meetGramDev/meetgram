import { baseApi } from '@/shared/api'

import { RegistrationConfirmationArgs, RegistrationEmailResendingArgs } from '../types/types'

export const registrationConfirmationService = baseApi.injectEndpoints({
  endpoints: builder => ({
    registrationConfirmation: builder.mutation<void, RegistrationConfirmationArgs>({
      query: args => ({
        body: args,
        method: 'POST',
        url: '/auth/registration-confirmation',
      }),
    }),
    registrationEmailResending: builder.mutation<void, RegistrationEmailResendingArgs>({
      query: args => ({
        body: args,
        method: 'POST',
        url: '/auth/registration-email-resending',
      }),
    }),
  }),
})

export const { useRegistrationConfirmationMutation, useRegistrationEmailResendingMutation } =
  registrationConfirmationService
