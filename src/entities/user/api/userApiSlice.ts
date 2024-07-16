import type { AuthMeResponseType, UserProfileResponseType } from './types'

import { baseApi } from '@/shared/api'

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserProfile: builder.query<UserProfileResponseType, void>({
      query: () => ({
        url: '/users/profile',
      }),
    }),
    me: builder.query<AuthMeResponseType, void>({
      query: () => ({
        url: '/auth/me',
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetUserProfileQuery,
  useLazyMeQuery,
  useMeQuery,
  util: { getRunningQueriesThunk },
} = userApi

// export endpoints for use in SSR
export const { getUserProfile } = userApi.endpoints
