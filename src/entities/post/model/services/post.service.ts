import { baseApi } from '@/shared/api'

import { AddCommentArgs, AddCommentResponse, GetCommentsResponse } from '../types/postTypes'
import { PublicPost } from '../types/posts.types'

export const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addPostComment: builder.mutation<AddCommentResponse, { body: AddCommentArgs; postId: number }>({
      invalidatesTags: postId => [{ postId, type: 'post' }],
      query: ({ body, postId }) => ({ body, method: 'POST', url: `posts/${postId}/comments` }),
    }),
    getPostComments: builder.query<GetCommentsResponse, { postId: number }>({
      providesTags: postId => [{ postId, type: 'post' }],
      query: ({ postId }) => `posts/${postId}/comments`,
    }),
    getSinglePublicPost: builder.query<PublicPost, string>({
      providesTags: (res, error, id) => [{ id, type: 'post' }],
      query: postId => ({
        url: `/public-posts/${postId}`,
      }),
    }),
  }),
})

export const { useAddPostCommentMutation, useGetPostCommentsQuery, useGetSinglePublicPostQuery } =
  postApi
