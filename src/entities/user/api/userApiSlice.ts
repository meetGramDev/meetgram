import type { AuthMeResponseType, FullUserProfile } from './types'

import { baseApi } from '@/shared/api'

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fullUserProfile: builder.query<FullUserProfile, string>({
      query: userName => ({
        method: 'GET',
        url: `/users/${userName}`,
      }),
    }),
    me: builder.query<AuthMeResponseType, void>({
      providesTags: ['auth', 'login'],
      query: () => ({
        url: '/auth/me',
      }),
    }),
  }),
})

export const { useFullUserProfileQuery, useLazyMeQuery, useMeQuery } = userApi
