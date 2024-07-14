import { baseApi } from '@/shared/api'

import { AuthMeResponseType, RefreshTokenResponseType, UserResponseType } from './types'

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
    userProfile: builder.query<UserResponseType, void>({
      query: () => ({
        method: 'GET',
        url: '/users/profile',
      }),
    }),
  }),
})

export const { useLazyMeQuery, useMeQuery, useRefreshTokenMutation, useUserProfileQuery } = userApi
