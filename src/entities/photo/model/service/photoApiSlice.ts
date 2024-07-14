import { baseApi } from '@/shared/api'

import { UploadPhotoArgsType, UploadPhotoResponseType } from '../types/photoService'

export const photoApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteProfilePhoto: builder.mutation<{ message: string }, any>({
      query: () => ({
        method: 'DELETE',
        url: '/users/profile/avatar',
      }),
    }),
    uploadProfilePhoto: builder.mutation<UploadPhotoResponseType, UploadPhotoArgsType>({
      query: body => ({
        body: body.file,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        url: '/users/profile/avatar',
      }),
    }),
  }),
})

export const { useDeleteProfilePhotoMutation, useUploadProfilePhotoMutation } = photoApi
