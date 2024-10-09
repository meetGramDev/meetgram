import { postApi } from '@/entities/post/model/services/post.service'
import { baseApi } from '@/shared/api'

import { EditPostRequestArgs } from '../types/editPost.types'

export const editPostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    editPost: builder.mutation<void, EditPostRequestArgs>({
      invalidatesTags: (res, error, args) =>
        !error?.data ? [{ id: args.postId, type: 'post' }] : [],
      query: args => ({
        body: { description: args.description },
        method: 'PUT',
        url: `posts/${args.postId}`,
      }),
    }),
  }),
})

export const { useEditPostMutation } = editPostApi
