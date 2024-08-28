import { baseApi } from '@/shared/api'

import { EditPostRequestArgs } from '../types/editPost.types'

export const editPostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    editPost: builder.mutation<void, EditPostRequestArgs>({
      query: args => ({
        body: args.description,
        method: 'PUT',
        url: `posts/${args.postId}`,
      }),
    }),
  }),
})

export const { useEditPostMutation } = editPostApi
