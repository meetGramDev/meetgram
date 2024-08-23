import { baseApi } from '@/shared/api'

import { CreatePost, UploadImageResponse } from '../types/addPostTypes'

export const addPostService = baseApi.injectEndpoints({
  endpoints: builder => ({
    addImages: builder.mutation<UploadImageResponse, FormData>({
      query: body => ({
        body,
        method: 'POST',
        url: '/posts/image',
      }),
    }),
    createPost: builder.mutation<any, CreatePost>({
      invalidatesTags: ['post'],
      query: body => ({
        body,
        method: 'POST',
        url: '/posts',
      }),
    }),
  }),
})

export const { useAddImagesMutation, useCreatePostMutation } = addPostService
