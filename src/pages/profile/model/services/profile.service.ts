import { baseApi } from '@/shared/api'

export type Profile = {
  aboutMe: string
  avatars: [
    {
      createdAt: string
      fileSize: number
      height: number
      url: string
      width: number
    },
  ]
  city: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  userName: string
}

export type UpdateProfile = {
  aboutMe?: string
  city?: string
  dateOfBirth?: string
  firstName: string
  lastName: string
  userName: string
}

export const profileService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<Profile, void>({
      providesTags: ['profile'],
      query: () => ({
        method: 'GET',
        url: '/users/profile',
      }),
    }),
    updateProfile: builder.mutation<Profile, UpdateProfile>({
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
