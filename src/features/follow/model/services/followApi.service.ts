import { baseApi } from '@/shared/api'

import {
  FollowUserArgsType,
  GetFollowingArgsType,
  GetFollowingResponseType,
} from '../types/service.types'

export const followService = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteFollower: builder.mutation<void, string>({
      invalidatesTags: (res, error, args) => (!error ? [{ id: args, type: 'follow' }] : []),
      query: userId => ({
        method: 'DELETE',
        url: `/users/follower/${userId}`,
      }),
    }),
    followUser: builder.mutation<void, FollowUserArgsType>({
      invalidatesTags: (res, error, args) =>
        !error?.data
          ? [
              { id: args.selectedUserId, type: 'PostLikes' },
              { id: args.selectedUserId, type: 'follow' },
              { type: 'profile' },
            ]
          : [],
      query: body => ({
        body,
        method: 'POST',
        url: `/users/following`,
      }),
    }),
    getUserFollowingOrFollowers: builder.query<GetFollowingResponseType, GetFollowingArgsType>({
      providesTags: res =>
        res
          ? [
              { id: 'LIST', type: 'follow' },
              ...res.items.map(({ userId }) => ({ id: userId, type: 'follow' as const })),
            ]
          : [{ id: 'LIST', type: 'follow' }],
      query: ({ isGetFollowers = false, userName, ...params }) => {
        let url = `/users/${userName}`

        url += isGetFollowers ? `/followers` : `/following`

        return { params, url }
      },
    }),
  }),
})

export const {
  useDeleteFollowerMutation,
  useFollowUserMutation,
  useGetUserFollowingOrFollowersQuery,
  useLazyGetUserFollowingOrFollowersQuery,
} = followService
