import { baseApi } from '@/shared/api'

import { Profile, UpdateProfileBody } from '../types/profileService'

export const profileService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<Profile, void>({
      providesTags: ['profile'],
      query: () => ({
        method: 'GET',
        url: '/users/profile',
      }),
    }),
    updateProfile: builder.mutation<Profile, UpdateProfileBody>({
      invalidatesTags: ['profile'],
      query: body => ({
        body,
        method: 'PUT',
        url: '/users/profile',
      }),
    }),
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = profileService
export const { getProfile } = profileService.endpoints
