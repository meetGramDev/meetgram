import type { AuthMeResponseType, RefreshTokenResponseType } from './types'

import { baseApi } from '@/shared/api'

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<AuthMeResponseType, void>({
      query: () => ({
        url: '/auth/me',
      }),
    }),
    refreshToken: builder.mutation<RefreshTokenResponseType, void>({
      query: () => ({
        method: 'POST',
        url: '/auth/update-tokens',
      }),
    }),
  }),
})

export const { useLazyMeQuery, useMeQuery, useRefreshTokenMutation } = userApi
