import { postsApi } from '@/entities/post'
import { baseApi } from '@/shared/api'

import { EditPostRequestArgs } from '../types/editPost.types'

export const editPostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    editPost: builder.mutation<void, EditPostRequestArgs>({
      invalidatesTags: (res, error, args) => [{ id: args.postId, type: 'post' }],
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const getEditPostPatchResult = dispatch(
          postsApi.util.updateQueryData('getSinglePublicPost', args.postId, state => {
            state.description = args.description
          })
        )

        try {
          await queryFulfilled
        } catch (e) {
          getEditPostPatchResult.undo()
        }
      },
      query: args => ({
        body: { description: args.description },
        method: 'PUT',
        url: `posts/${args.postId}`,
      }),
    }),
  }),
})

export const { useEditPostMutation } = editPostApi
