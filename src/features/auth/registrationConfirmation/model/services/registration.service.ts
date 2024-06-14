import { baseApi } from '@/shared/api'

type RegistrationConfirmationArgs = {
  confirmationCode: string
}

export const registrationConfirmationService = baseApi.injectEndpoints({
  endpoints: builder => ({
    registrationConfirmation: builder.mutation<void, RegistrationConfirmationArgs>({
      query: args => ({
        body: args,
        method: 'POST',
        url: '/auth/registration-confirmation',
      }),
    }),
  }),
})

export const { useRegistrationConfirmationMutation } = registrationConfirmationService
