import { baseApi } from '@/shared/api'

import {
  FollowUserArgsType,
  GetFollowingArgsType,
  GetFollowingResponseType,
} from '../types/service.types'

export const followService = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteFollower: builder.mutation<void, string>({
      invalidatesTags: (res, error, args) =>
        !error ? [{ id: args, type: 'follow' }, { type: 'profile' }] : [],
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
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.cursor !== previousArg?.cursor
      },
      merge: (currentCacheData, responseData, otherArgs) => {
        if (!otherArgs.arg.cursor) {
          return responseData
        }

        Object.assign(currentCacheData, responseData)
        currentCacheData.items.push(...responseData.items)
      },
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
      serializeQueryArgs: ({ queryArgs }) =>
        `${queryArgs.isGetFollowers ? 'followers_' : 'following_'} ${queryArgs.userName}`,
    }),
  }),
})

export const {
  useDeleteFollowerMutation,
  useFollowUserMutation,
  useGetUserFollowingOrFollowersQuery,
  useLazyGetUserFollowingOrFollowersQuery,
} = followService
