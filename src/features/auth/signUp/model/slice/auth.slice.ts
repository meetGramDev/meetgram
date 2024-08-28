import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  initialState: {
    email: '',
  },
  name: 'auth',
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
  },
})

export const { actions: authSliceActions } = authSlice
