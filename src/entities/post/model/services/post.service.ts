import { baseApi } from '@/shared/api'

import { GetPublicPostsRequest, GetPublicPostsResponse } from '../types/posts.types'

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPublicPosts: builder.query<GetPublicPostsResponse, GetPublicPostsRequest>({
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.endCursorPostId !== previousArg?.endCursorPostId ||
          currentArg?.params !== previousArg?.params
        )
      },
      merge: (currentCacheData, responseData) => {
        currentCacheData.items.push(...responseData.items)
        currentCacheData.totalCount = responseData.totalCount
        currentCacheData.pageSize = responseData.pageSize
        currentCacheData.totalUsers = responseData.totalUsers
      },
      providesTags: ['posts'],
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

export const { useGetPublicPostsQuery } = postsApi
