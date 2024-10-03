import type { AuthMeResponseType, FullUserProfile, PublicProfile } from '../types/services'

import { baseApi } from '@/shared/api'

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fullUserProfile: builder.query<FullUserProfile, string>({
      providesTags: ['profile'],
      query: userName => ({
        method: 'GET',
        url: `/users/${userName}`,
      }),
    }),
    getPublicProfileById: builder.query<PublicProfile, string>({
      query: id => ({
        url: `/public-user/profile/${id}`,
      }),
    }),
    me: builder.query<AuthMeResponseType, void>({
      query: () => ({
        url: '/auth/me',
      }),
    }),
  }),
})

export const {
  useFullUserProfileQuery,
  useGetPublicProfileByIdQuery,
  useLazyMeQuery,
  useMeQuery,
  util: { getRunningQueriesThunk },
} = userApi
