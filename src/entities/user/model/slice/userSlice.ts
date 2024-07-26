import { userApi } from '@/entities/user/api/userApiSlice'
import { Nullable } from '@/shared/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { SetCredentialsPayload } from './types'

const initialState = {
  accessToken: null as Nullable<string>,
  accountData: {
    email: '',
    isBlocked: false,
    userId: null as Nullable<number>,
    userName: '',
  },
  isAuth: false,
}

export const userSlice = createSlice({
  extraReducers: builder => {
    builder
      .addMatcher(userApi.endpoints.me.matchFulfilled, (state, { payload }) => {
        state.accountData = payload
        state.isAuth = true
      })
      .addMatcher(userApi.endpoints.me.matchRejected, state => {
        state.isAuth = false
        state.accessToken = null
        state.accountData = initialState.accountData
      })
  },
  initialState,
  name: 'user',
  reducers: {
    /**
     * Created to use in baseQueryWithReAuth in createApi
     */
    logoutUser(state) {
      state.isAuth = false
      state.accessToken = null
      state.accountData = initialState.accountData
    },
    setCredentials(state, { payload }: PayloadAction<SetCredentialsPayload>) {
      state.accessToken = payload.accessToken
    },
  },
})

export const { logoutUser, setCredentials } = userSlice.actions
