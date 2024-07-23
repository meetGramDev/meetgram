import type { Avatar } from '@/shared/types'

export type AuthMeResponseType = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}

export interface UserProfileResponseType {
  aboutMe: string
  avatars: Avatar[]
  city: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  userName: string
}

export type UserResponseWithPosts = {
  aboutMe: string
  avatars: Avatar[]
  city: string
  dateOfBirth: string
  firstName: string
  followersCount: number
  followingCount: number
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  lastName: string
  publicationsCount: number
  userName: string
}
