import { baseApi } from '@/shared/api'

import { UploadPhotoResponseType } from '../types/photoService'

export const photoApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteProfilePhoto: builder.mutation<{ message: string }, void>({
      query: () => ({
        method: 'DELETE',
        url: '/users/profile/avatar',
      }),
    }),
    uploadProfilePhoto: builder.mutation<UploadPhotoResponseType, FormData>({
      query: body => ({
        body: body,
        headers: {
          Accept: 'application/json',
        },
        method: 'POST',
        url: '/users/profile/avatar',
      }),
    }),
  }),
})

export const { useDeleteProfilePhotoMutation, useUploadProfilePhotoMutation } = photoApi
