import { baseApi } from '@/shared/api'
import { getProvidesTags } from '@/shared/lib'

import { GetPublicPostsArgs, GetPublicPostsResponse } from '../types/posts.types'

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deletePost: builder.mutation<void, { postId: string }>({
      invalidatesTags: (res, err, args) => [{ id: 'LIST', type: 'post' }, { type: 'profile' }],
      query: args => ({
        method: 'DELETE',
        url: `posts/${args.postId}`,
      }),
    }),
    getAllPublicPosts: builder.query<GetPublicPostsResponse, {}>({
      query: args => ({
        method: 'GET',
        url: `/public-posts/all/`,
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
  }),
})
export const { useDeletePostMutation, useGetAllPublicPostsQuery, useGetPublicPostsQuery, useLazyGetPublicPostsQuery } = postsApi
