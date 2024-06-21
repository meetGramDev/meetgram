import { Nullable } from '@/shared/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { UserDataPayload } from './types'

const initialState = {
  providers: {
    github: null as Nullable<string>,
    google: null as Nullable<string>,
  },
  system: {
    email: '',
    isBlocked: false,
    userId: 0,
    userName: '',
  },
}

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    updateEmail(state, action: PayloadAction<string>) {
      state.system.email = action.payload
    },
    updateUserData(state, action: PayloadAction<UserDataPayload>) {
      state.system = action.payload
      if (action.payload.providers) {
        state.providers[action.payload.providers] = action.payload.email
      }
    },
  },
})

export const { updateEmail } = userSlice.actions
