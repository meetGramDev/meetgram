import { baseApi } from '@/shared/api'

export const googleLoginApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    googleLogin: builder.mutation<GoogleLoginResponseType, string>({
      query: arg => ({
        body: {
          code: arg,
        },
        method: 'POST',
        url: `/auth/google/login`,
      }),
    }),
  }),
})

export const { useGoogleLoginMutation } = googleLoginApi

type GoogleLoginResponseType = {
  accessToken: 'string'
  email: 'string'
}
