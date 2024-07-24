import { userApi } from '@/entities/user/api/userApiSlice'
import { Nullable } from '@/shared/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { SetCredentialsPayload, SetProviderPayload } from './types'

const initialState = {
  accessToken: null as Nullable<string>,
  accountData: {
    email: '',
    isBlocked: false,
    userId: null as Nullable<number>,
    userName: '',
  },
  isAuth: false,
  providers: {
    github: null as Nullable<string>,
    google: null as Nullable<string>,
  },
}

export const userSlice = createSlice({
  extraReducers: builder => {
    builder
      .addMatcher(userApi.endpoints.me.matchFulfilled, (state, { payload }) => {
        state.accountData = payload
        state.isAuth = true
      })
      .addMatcher(userApi.endpoints.me.matchRejected, (state, {}) => {
        state.isAuth = false
      })
  },
  initialState,
  name: 'user',
  reducers: {
    setCredentials(state, { payload }: PayloadAction<SetCredentialsPayload>) {
      state.accessToken = payload.accessToken
    },
    setProvider(state, { payload }: PayloadAction<SetProviderPayload>) {
      state.providers[payload.provider] = payload.email
    },
  },
})

export const { setCredentials, setProvider } = userSlice.actions
