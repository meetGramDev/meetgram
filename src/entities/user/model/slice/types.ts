export type UserDataPayload = {
  email: string
  isBlocked: boolean
  providers?: 'github' | 'google'
  userId: number
  userName: string
}
