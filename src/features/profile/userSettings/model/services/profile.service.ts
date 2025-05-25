import { Profile } from '@/entities/user'
import { baseApi } from '@/shared/api'

import { UserSettingsFormData } from '../../lib/useUserSettings'

export const profileService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCountries: builder.query<any, void>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        try {
          const countries = await fetch('https://restcountries.com/v3.1/all')

          console.log(countries)

          return { data: countries }
        } catch (error) {
          return error
        }
      },
    }),
    getProfile: builder.query<Profile, void>({
      providesTags: ['profile'],
      query: () => ({
        method: 'GET',
        url: '/users/profile',
      }),
    }),
    updateProfile: builder.mutation<Profile, UserSettingsFormData>({
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
