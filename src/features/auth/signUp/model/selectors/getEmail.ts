import { RootState } from '@/app/lib'

export const getEmail = (state: RootState) => state.auth.email
