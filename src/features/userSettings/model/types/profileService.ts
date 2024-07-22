import { Avatar } from '@/entities/user'

export type Profile = {
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

export type UpdateProfileBody = {
  aboutMe?: string
  city?: string
  dateOfBirth?: string
  firstName: string
  lastName: string
  userName: string
}
