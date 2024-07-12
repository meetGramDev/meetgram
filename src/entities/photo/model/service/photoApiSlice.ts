import { baseApi } from '@/shared/api'

import { UploadPhotoArgsType, UploadPhotoResponseType } from '../types/photoService'

export const photoApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deletePhoto: builder.mutation<{ message: string }, any>({
      query: () => ({
        method: 'DELETE',
        url: '/users/profile/avatar',
      }),
    }),
    uploadPhoto: builder.mutation<UploadPhotoResponseType, UploadPhotoArgsType>({
      query: body => ({
        body,
        method: 'POST',
        url: '/users/profile/avatar',
      }),
    }),
  }),
})

export const { useDeletePhotoMutation, useUploadPhotoMutation } = photoApi
