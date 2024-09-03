import { baseApi } from '@/shared/api'

import {
  GetWhoLikedPostRequest,
  GetWhoLikedPostResponse,
  GiveLikeToPostArgs,
} from '../types/service.types'

export const likePostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getWhoLikedPost: builder.query<GetWhoLikedPostResponse, GetWhoLikedPostRequest>({
      providesTags: ['PostLikes'],
      query: ({ params, postId }) => ({
        params,
        url: `/posts/${postId}/likes`,
      }),
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
