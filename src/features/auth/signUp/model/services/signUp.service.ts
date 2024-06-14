import { baseApi } from '@/shared/api'

export type SignUpArgs = {
  baseUrl: string
  email: string
  password: string
  userName: string
}

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
