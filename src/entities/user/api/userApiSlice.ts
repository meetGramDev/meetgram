import type { AuthMeResponseType, UserResponseWithPosts } from './types'

import { baseApi } from '@/shared/api'

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fullUserProfile: builder.query<UserResponseWithPosts, string>({
      query: userName => ({
        method: 'GET',
        url: `/users/${userName}`,
      }),
    }),
    me: builder.query<AuthMeResponseType, void>({
      providesTags: ['logout'],
      query: () => ({
        url: '/auth/me',
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useFullUserProfileQuery,
  useLazyMeQuery,
  useMeQuery,
  util: { getRunningQueriesThunk },
} = userApi
