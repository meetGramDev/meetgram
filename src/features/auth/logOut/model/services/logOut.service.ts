import { baseApi } from '@/shared/api'
import { nextSessionApi } from '@/shared/api/_next-auth'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const logoutService = baseApi.injectEndpoints({
  endpoints: builder => ({
    logOut: builder.mutation<string, void>({
      invalidatesTags: ['logout'],
      queryFn: async (_args, _queryApi, _extraOptions, baseQuery) => {
        const logoutRes = await baseQuery({ method: 'POST', url: '/auth/logout' })

        if (logoutRes.error) {
          return { error: logoutRes.error as FetchBaseQueryError }
        }

        const sessionRes = await nextSessionApi.deleteSession()

        return sessionRes.data
          ? { data: sessionRes.data.message }
          : {
              error: {
                error: 'An error has occurred when logged out',
                status: 'CUSTOM_ERROR',
              } as FetchBaseQueryError,
            }
      },
    }),
  }),
})

export const { useLogOutMutation } = logoutService
