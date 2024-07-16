import { baseApi } from '@/shared/api'

import { AuthMeResponseType, RefreshTokenResponseType, UserResponseWithPosts } from './types'

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fullUserProfile: builder.query<UserResponseWithPosts, { userName: string }>({
      query: args => ({
        method: 'GET',
        url: `/users/${args.userName}`,
      }),
    }),
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

export const { useFullUserProfileQuery, useLazyMeQuery, useMeQuery, useRefreshTokenMutation } =
  userApi
