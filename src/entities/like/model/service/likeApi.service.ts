import { baseApi } from '@/shared/api'

import {
  GetWhoLikedPostRequest,
  GetWhoLikedPostResponse,
  GiveLikeToPostArgs,
} from '../types/service.types'

export const likePostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getWhoLikedPost: builder.query<GetWhoLikedPostResponse, GetWhoLikedPostRequest>({
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.cursor !== previousArg?.cursor
      },
      merge(currentCacheData, responseData, otherArgs) {
        if (!otherArgs.arg.cursor) {
          return responseData
        }

        Object.assign(currentCacheData, responseData)
        currentCacheData.items.push(...responseData.items)
      },
      providesTags: res =>
        res
          ? [
              { id: 'LIST', type: 'PostLikes' },
              ...res.items.map(item => ({ id: item.userId, type: 'PostLikes' as const })),
            ]
          : [{ id: 'LIST', type: 'PostLikes' }],
      query: ({ postId, ...params }) => ({
        params,
        url: `/posts/${postId}/likes`,
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        return { id: queryArgs.postId }
      },
    }),
    giveLikeToPost: builder.mutation<void, GiveLikeToPostArgs>({
      invalidatesTags: (res, error, args) => [
        { type: 'PostLikes' },
        { id: args.postId, type: 'post' },
      ],
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const getGiveLikePostPatch = dispatch(
          likePostApi.util.updateQueryData('getWhoLikedPost', { postId: args.postId }, state => {
            state.isLiked = args.likeStatus === 'NONE'
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

export const { useGetWhoLikedPostQuery, useGiveLikeToPostMutation } = likePostApi
