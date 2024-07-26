import type { AuthMeResponseType, UserProfileResponseType, UserResponseWithPosts } from './types'

import { baseApi } from '@/shared/api'

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fullUserProfile: builder.query<UserResponseWithPosts, string>({
      query: userName => ({
        method: 'GET',
        url: `/users/${userName}`,
      }),
    }),
    getUserProfile: builder.query<UserProfileResponseType, void>({
      query: () => ({
        url: '/users/profile',
      }),
    }),
    me: builder.query<AuthMeResponseType, void>({
      providesTags: ['auth'],
      query: () => ({
        url: '/auth/me',
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useFullUserProfileQuery,
  useGetUserProfileQuery,
  useLazyMeQuery,
  useMeQuery,
  util: { getRunningQueriesThunk },
} = userApi

// export endpoints for use in SSR
export const { getUserProfile } = userApi.endpoints
