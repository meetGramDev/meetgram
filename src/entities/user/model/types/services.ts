import { Avatar } from '@/shared/types'

export type AuthMeResponseType = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}

export type RefreshTokenResponseType = {
  accessToken: string
}

export type Profile = {
  aboutMe: string
  avatars: Avatar[]
  city: string
  country: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  userName: string
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

export type PublicProfile = {
  aboutMe: string
  avatars: Avatar[]
  id: number
  userName: string
}
