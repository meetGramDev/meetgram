import { baseApi } from '@/shared/api'

import { FollowUserArgsType } from '../types/service.types'

export const followService = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteFollower: builder.mutation<void, string>({
      query: userId => ({
        method: 'DELETE',
        url: `/users/follower/${userId}`,
      }),
    }),
    followUser: builder.mutation<void, FollowUserArgsType>({
      invalidatesTags: (res, error, args) =>
        !error?.data ? [{ id: args.selectedUserId, type: 'PostLikes' }] : [],
      query: body => ({
        body,
        method: 'POST',
        url: `/users/following`,
      }),
    }),
  }),
})

export const { useDeleteFollowerMutation, useFollowUserMutation } = followService
