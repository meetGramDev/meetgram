import { baseApi } from '@/shared/api'

export const signUpService = baseApi.injectEndpoints({
  endpoints: builder => ({
    logOut: builder.mutation<void, void>({
      query: () => {
        return {
          method: 'POST',
          url: '/auth/logout',
        }
      },
    }),
  }),
})

export const { useLogOutMutation } = signUpService
