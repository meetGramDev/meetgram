import { logoutUser } from '@/entities/user'
import { baseApi } from '@/shared/api'
import { nextSessionApi } from '@/shared/api/_next-auth'
import { StatusCode } from '@/shared/enum'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const logoutService = baseApi.injectEndpoints({
  endpoints: builder => ({
    logOut: builder.mutation<string, void>({
      queryFn: async (_args, _queryApi, _extraOptions, baseQuery) => {
        const logoutRes = await baseQuery({ method: 'POST', url: '/auth/logout' })

        if (logoutRes.error) {
          return { error: logoutRes.error as FetchBaseQueryError }
        }

        const sessionRes = await nextSessionApi.deleteSession()

        if (sessionRes.status === StatusCode.BadRequest) {
          return {
            error: {
              error: 'An error has occurred when logged out',
              status: 'CUSTOM_ERROR',
            } as FetchBaseQueryError,
          }
        }

        _queryApi.dispatch(logoutUser())

        return { data: sessionRes.data.message }
      },
    }),
  }),
})

export const { useLogOutMutation } = logoutService
