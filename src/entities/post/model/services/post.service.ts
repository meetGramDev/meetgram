import { baseApi } from '@/shared/api'
import { getProvidesTags } from '@/shared/lib'

import {
  GetPostLikesResponse,
  GetPublicPostsArgs,
  GetPublicPostsResponse,
  GiveLikeToPostArgs,
  LikeStatus,
  PublicPost,
} from '../types/posts.types'

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPostLikes: builder.query<GetPostLikesResponse, number>({
      providesTags: ['PostLikes'],
      query: postId => ({
        url: `/posts/${postId}/likes`,
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
    giveLikeToPost: builder.mutation<void, GiveLikeToPostArgs>({
      invalidatesTags: (res, error, args) => [
        { type: 'PostLikes' },
        { id: args.postId, type: 'post' },
      ],
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const getGiveLikePostPatch = dispatch(
          postsApi.util.updateQueryData('getPostLikes', args.postId, state => {
            state.isLiked = args.likeStatus === 'NONE' ? true : false
          })
        )

        try {
          await queryFulfilled
        } catch (error) {
          getGiveLikePostPatch.undo()
        }
      },
      query: ({ likeStatus, postId }) => ({
        body: { likeStatus },
        method: 'PUT',
        url: `/posts/${postId}/like-status`,
      }),
    }),
  }),
})

export const {
  useGetPostLikesQuery,
  useGetPublicPostsQuery,
  useGetSinglePublicPostQuery,
  useGiveLikeToPostMutation,
} = postsApi
