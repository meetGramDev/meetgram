import {
  AddCommentArgs,
  AddCommentResponse,
  GetCommentsArgs,
  GetCommentsResponse,
} from '@/entities/post/model/types/postViewTypes'
import { baseApi } from '@/shared/api'

export const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addPostComment: builder.mutation<AddCommentResponse, { body: AddCommentArgs; postId: number }>({
      invalidatesTags: ['post'],
      query: ({ body, postId }) => ({ body, method: 'POST', url: `posts/${postId}/comments` }),
    }),
    getPostComments: builder.query<GetCommentsResponse, GetCommentsArgs>({
      // forceRefetch: ({ currentArg, previousArg }) => {
      //   return currentArg?.params.pageNumber !== previousArg?.params.pageNumber
      // },
      // merge: (currentCache, newItems) => {
      //   currentCache.items.push(...newItems.items)
      //   currentCache.totalCount = newItems.totalCount
      //   currentCache.pageSize = newItems.pageSize
      // },
      providesTags: postId => [{ postId: postId, type: 'post' }],
      query: args => `posts/${args.postId}/comments`,
      // serializeQueryArgs: ({ endpointName }) => endpointName,
    }),
  }),
})

export const { useAddPostCommentMutation, useGetPostCommentsQuery } = postApi
