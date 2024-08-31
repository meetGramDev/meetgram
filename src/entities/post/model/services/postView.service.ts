import {
  AddCommentArgs,
  AddCommentResponse,
  GetCommentsArgs,
  GetCommentsResponse,
} from '@/entities/post/model/types/postViewTypes'
import { baseApi } from '@/shared/api'
import { getProvidesTags } from '@/shared/lib'

export const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addPostComment: builder.mutation<AddCommentResponse, { body: AddCommentArgs; postId: number }>({
      invalidatesTags: postId => [{ postId, type: 'post' }],
      query: ({ body, postId }) => ({ body, method: 'POST', url: `posts/${postId}/comments` }),
    }),
    getPostComments: builder.query<GetCommentsResponse, GetCommentsArgs>({
      merge: (currentCacheData, responseData, { arg }) => {
        currentCacheData.items.push(...responseData.items)
        currentCacheData.totalCount = responseData.totalCount
        currentCacheData.pageSize = responseData.pageSize
      },
      providesTags: postId => [{ postId, type: 'post' }],
      query: ({ params: { pageNumber, pageSize }, postId }: GetCommentsArgs) => ({
        params: { pageNumber, pageSize },
        url: `posts/${postId}/comments`,
      }),
    }),
  }),
})
export const { useAddPostCommentMutation, useGetPostCommentsQuery } = postApi
