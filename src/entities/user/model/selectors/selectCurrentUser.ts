import { RootState } from '@/app/lib'

export const SelectCurrentUser = (state: RootState) => state.user.accountData
export const SelectCurrentUserName = (state: RootState) => state.user.accountData.userName
export const SelectIsUserAuth = (state: RootState) => state.user.isAuth
