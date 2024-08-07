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
