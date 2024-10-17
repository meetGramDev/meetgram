import {
  AddAnswerResponse,
  AddAnswersArgs,
  GetAnswersResponse,
} from '@/entities/post/model/types/answersType'
import { baseApi } from '@/shared/api'

import { AddCommentResponse, GetCommentsResponse } from '../types/postTypes'
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
      invalidatesTags: (res, error, { commentId }) => [{ commentId, type: 'commentLike' }],
      async onQueryStarted({ commentId, likeStatus, postId }, { dispatch, queryFulfilled }) {
        const likeComment = dispatch(
          postApi.util.updateQueryData(
            'getPostComments',
            {
              pageNumber: 0,
              pageSize: 0,
              postId,
            },
            state => {
              state.items.map(
                comment => comment.id === commentId && (comment.isLiked = likeStatus === 'LIKE')
              )
            }
          )
        )

        try {
          queryFulfilled
        } catch (error) {
          likeComment.undo()
        }
      },
      query: ({ commentId, likeStatus, postId }) => ({
        body: { likeStatus },
        method: 'PUT',
        url: `posts/${postId}/comments/${commentId}/like-status`,
      }),
    }),

    addPostComment: builder.mutation<
      AddCommentResponse,
      { body: { content: string }; pageNumber: number; postId: number }
    >({
      async onQueryStarted({ pageNumber, postId }, { dispatch, queryFulfilled }) {
        try {
          const { data: newPost } = await queryFulfilled

          dispatch(
            postApi.util.updateQueryData(
              'getPostComments',
              {
                pageNumber,
                pageSize: 0,
                postId,
              },
              state => {
                state.items.unshift(newPost)
              }
            )
          )
        } catch (error) {
          console.error(error)
        }
      },

      query: ({ body, postId }) => ({ body, method: 'POST', url: `posts/${postId}/comments` }),
    }),

    getAnswerComments: builder.query<GetAnswersResponse, { commentId: number; postId: number }>({
      providesTags: (res, err, args) => [{ id: args.postId, type: 'post' }],
      query: ({ commentId, postId }) => ({
        url: `posts/${postId}/comments/${commentId}/answers`,
      }),
    }),
    getPostComments: builder.query<
      GetCommentsResponse,
      { pageNumber: number; pageSize: number; postId: number }
    >({
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      merge: (currentCache, newItems, { arg }) => {
        const { pageNumber } = arg

        if (pageNumber === 1) {
          return newItems
        }
        const uniqueNewItems = newItems.items.filter(
          newItem => !currentCache.items.some(existingItem => existingItem.id === newItem.id)
        )
        const updatedData = [...currentCache.items, ...uniqueNewItems]

        return {
          ...newItems,
          items: updatedData,
        }
      },
      providesTags: postId => [{ postId, type: 'post' }],
      query: ({ pageNumber, pageSize, postId }) =>
        `posts/${postId}/comments?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      serializeQueryArgs: ({ queryArgs }) => {
        return {
          id: queryArgs.postId,
        }
      },
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
