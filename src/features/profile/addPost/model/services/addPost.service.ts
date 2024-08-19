import { baseApi } from '@/shared/api'

import { CreatePost, GetPublicPostsResponse, UploadImageResponse } from '../types/addPostTypes'

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
    // getPosts: builder.query<any, any>({
    //   query: username => ({
    //     url: `/posts/${username}`,
    //   }),
    // }),
    getPublicPosts: builder.query<GetPublicPostsResponse[], string>({
      providesTags: ['post'],
      query: id => ({
        url: `/public-posts/user/${id}`,
      }),
    }),
  }),
})

export const { useAddImagesMutation, useCreatePostMutation, useGetPublicPostsQuery } =
  addPostService
