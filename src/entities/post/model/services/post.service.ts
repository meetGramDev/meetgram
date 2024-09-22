import {
  AddAnswerResponse,
  AddAnswersArgs,
  GetAnswersResponse,
} from '@/features/posts/comments/model/types/answersType'
import { baseApi } from '@/shared/api'

import { AddCommentArgs, AddCommentResponse, GetCommentsResponse } from '../types/postTypes'
import { PublicPost } from '../types/posts.types'

export const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addAnswerComment: builder.mutation<
      AddAnswerResponse,
      { body: AddAnswersArgs; commentId: number; postId: number }
    >({
      invalidatesTags: (postId, commentId) => [{ commentId, postId, type: 'post' }],
      query: ({ body, commentId, postId }) => ({
        body,
        method: 'POST',
        url: `posts/${postId}/comments/${commentId}/answers`,
      }),
    }),

    addLikeToPostComment: builder.mutation<
      void,
      { commentId: number; likeStatus: string; postId: number }
    >({
      invalidatesTags: (result, error, { commentId, likeStatus, postId }) => [
        { commentId, likeStatus, postId: postId, type: 'post' },
      ],
      query: ({ commentId, likeStatus, postId }) => ({
        body: { likeStatus },
        method: 'PUT',
        url: `posts/${postId}/comments/${commentId}/like-status`,
      }),
    }),
    addPostComment: builder.mutation<AddCommentResponse, { body: AddCommentArgs; postId: number }>({
      invalidatesTags: postId => [{ postId, type: 'post' }],
      query: ({ body, postId }) => ({ body, method: 'POST', url: `posts/${postId}/comments` }),
    }),

    getAnswerComments: builder.query<GetAnswersResponse, { commentId: number; postId: number }>({
      providesTags: (res, err, args) => [{ id: args.postId, type: 'post' }],
      query: ({ commentId, postId }) => ({
        url: `posts/${postId}/comments/${commentId}/answers`,
      }),
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

export const {
  useAddAnswerCommentMutation,
  useAddLikeToPostCommentMutation,
  useAddPostCommentMutation,
  useGetAnswerCommentsQuery,
  useGetPostCommentsQuery,
  useGetSinglePublicPostQuery,
} = postApi
