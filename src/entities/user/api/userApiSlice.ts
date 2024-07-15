import type { AuthMeResponseType } from './types'

import { baseApi } from '@/shared/api'

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<AuthMeResponseType, void>({
      query: () => ({
        url: '/auth/me',
      }),
    }),
  }),
})

export const { useLazyMeQuery, useMeQuery } = userApi
