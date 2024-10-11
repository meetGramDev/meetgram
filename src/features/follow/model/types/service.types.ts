import { FollowLikeItemType, PaginationQueriesType, PaginationType } from '@/shared/types'

export type FollowUserArgsType = {
  selectedUserId: number
}

export type GetFollowingArgsType = {
  isGetFollowers?: boolean
  userName: string
} & PaginationQueriesType

export type GetFollowingResponseType = PaginationType<FollowLikeItemType>
