import { userSlice } from '@/entities/user'
import { authSlice } from '@/features/auth/signUp'
import { addPostSlice } from '@/features/posts/addPost'
import { baseApi } from '@/shared/api'
import { type Action, type ThunkAction, combineSlices, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineSlices(baseApi, userSlice, authSlice, addPostSlice)

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = () => {
  return configureStore({
    devTools: true,
    // and other useful features of `rtk-query`.
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(baseApi.middleware)
    },
    // Adding the api middleware enables caching, invalidation, polling,
    reducer: rootReducer,
  })
}

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
