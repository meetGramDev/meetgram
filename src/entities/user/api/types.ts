export type AuthMeResponseType = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}

export type RefreshTokenResponseType = {
  accessToken: string
}

export type Avatars = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type UserResponseType = {
  aboutMe: string
  avatars: Avatars[]
  city: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  userName: string
}
