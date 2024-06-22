import { RootState } from '@/app/lib'

export const SelectCurrentUser = (state: RootState) => state.user.accountData
