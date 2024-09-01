import { baseApi } from '@/shared/api'
import { getProvidesTags } from '@/shared/lib'

import { GetPublicPostsArgs, GetPublicPostsResponse, PublicPost } from '../types/posts.types'

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deletePost: builder.mutation<void, { postId: number }>({
      invalidatesTags: ['post'],
      query: args => ({
        method: 'DELETE',
        url: `posts/${args.postId}`,
      }),
    }),
    getPublicPosts: builder.query<GetPublicPostsResponse, GetPublicPostsArgs>({
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.endCursorPostId !== previousArg?.endCursorPostId ||
          currentArg?.params !== previousArg?.params
        )
      },
      merge: (currentCacheData, responseData, { arg }) => {
        if (!arg.endCursorPostId) {
          return responseData
        }

        currentCacheData.items.push(...responseData.items)
        currentCacheData.totalCount = responseData.totalCount
        currentCacheData.pageSize = responseData.pageSize
        currentCacheData.totalUsers = responseData.totalUsers
      },
      providesTags: res => getProvidesTags(res?.items, 'post'),
      query: args => {
        let url: string = `/public-posts/user/`

        if (args.endCursorPostId) {
          url += `${args.id}/${args.endCursorPostId}`
        } else {
          url += `${args.id}`
        }

        return {
          params: args.params,
          url,
        }
      },
      serializeQueryArgs: ({ queryArgs }) => {
        return { id: queryArgs.id }
      },
    }),
    getSinglePublicPost: builder.query<PublicPost, number>({
      providesTags: (res, error, id) => [{ id, type: 'post' }],
      query: postId => ({
        url: `/public-posts/${postId}`,
      }),
    }),
  }),
})
export const { useDeletePostMutation, useGetPublicPostsQuery, useGetSinglePublicPostQuery } =
  postsApi
