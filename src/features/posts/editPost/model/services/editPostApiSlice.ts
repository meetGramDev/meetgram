import { baseApi } from '@/shared/api'

import { EditPostRequestArgs } from '../types/editPost.types'

export const editPostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    editPost: builder.mutation<void, EditPostRequestArgs>({
      invalidatesTags: ['post'],
      query: args => ({
        body: { description: args.description },
        method: 'PUT',
        url: `posts/${args.postId}`,
      }),
    }),
  }),
})

export const { useEditPostMutation } = editPostApi
