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
