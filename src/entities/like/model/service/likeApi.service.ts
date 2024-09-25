import { baseApi } from '@/shared/api'
import { getProvidesTags } from '@/shared/lib'

import {
  GetWhoLikedPostRequest,
  GetWhoLikedPostResponse,
  GiveLikeToPostArgs,
} from '../types/service.types'

export const likePostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getWhoLikedPost: builder.query<GetWhoLikedPostResponse, GetWhoLikedPostRequest>({
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.params?.cursor !== previousArg?.params?.cursor
      },
      merge(currentCacheData, responseData, otherArgs) {
        if (!otherArgs.arg.params?.cursor) {
          return responseData
        }

        Object.assign(currentCacheData, responseData)
        currentCacheData.items.push(...responseData.items)
      },
      providesTags: res => getProvidesTags(res?.items, 'PostLikes'),
      query: ({ params, postId }) => ({
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

export const { useGetWhoLikedPostQuery, useGiveLikeToPostMutation } = likePostApi
