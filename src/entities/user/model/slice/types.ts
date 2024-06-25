export type SetCredentialsPayload = {
  accessToken: string
}

export type SetUserData = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}

export type SetProviderPayload = {
  email: string
  provider: 'github' | 'google'
}
