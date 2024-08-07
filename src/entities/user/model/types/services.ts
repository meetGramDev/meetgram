import { Profile } from '@/features/userSettings'

export type AuthMeResponseType = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}

export type RefreshTokenResponseType = {
  accessToken: string
}

export type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type FullUserProfile = {
  createdAt?: string
  followersCount: number
  followingCount: number
  isFollowedBy: boolean
  isFollowing: boolean
  publicationsCount: number
  region: string
} & Profile
