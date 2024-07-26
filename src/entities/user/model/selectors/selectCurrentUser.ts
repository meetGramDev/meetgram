import { RootState } from '@/app/lib'

export const selectCurrentUser = (state: RootState) => state.user.accountData
export const selectCurrentUserName = (state: RootState) => state.user.accountData.userName
export const selectIsUserAuth = (state: RootState) => state.user.isAuth
export const selectCurrentUserEmail = (state: RootState) => state.user.accountData.email
