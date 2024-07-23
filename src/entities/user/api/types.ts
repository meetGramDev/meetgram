import { Avatar } from '@/shared/types'

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

export type Avatars = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type UserResponseWithPosts = {
  aboutMe: string
  avatars: Avatars[]
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
