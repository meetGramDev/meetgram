import { RootState } from '@/app/lib'
import { logoutUser, setCredentials } from '@/entities/user'
import { nextSessionApi } from '@/shared/api/_next-auth'
import { StatusCode } from '@/shared/enum'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

import { BASE_URL } from './baseUrl'
import { RefreshTokenResponseType } from './types'

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL })

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).user.accessToken

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`)
    }

    return headers
  },
})
const baseQueryWithReAuth: BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  // try to make any request
  let resp = await baseQueryWithAuth(args, api, extraOptions)

  if (resp.error && resp.error.status === StatusCode.Unauthorized) {
    try {
      // retrieve accessToken from cookie
      const messageResp = await nextSessionApi.getSessionToken()

      const { accessToken } = messageResp.data as RefreshTokenResponseType

      api.dispatch(setCredentials({ accessToken }))

      // retry the initial query
      resp = await baseQueryWithAuth(args, api, extraOptions)
    } catch (e) {
      // try to refresh an authorization token
      resp = await baseQuery(
        { credentials: 'include', method: 'POST', url: '/auth/update-tokens' },
        api,
        extraOptions
      )
      // if user still authorize on the server
      if (resp.data) {
        const { accessToken } = resp.data as RefreshTokenResponseType
        const messageResp = await nextSessionApi.makeSession(accessToken)

        if (messageResp.status === StatusCode.Success) {
          api.dispatch(setCredentials({ accessToken }))

          // retry the initial query
          resp = await baseQueryWithAuth(args, api, extraOptions)
        }
      } else {
        // Otherwise logout user and clear state
        api.dispatch(logoutUser())
      }
    }
  }

  return resp
}

export const baseApi = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  reducerPath: 'meetGramApi',
  tagTypes: [
    'profile',
    'post',
    'PostLikes',
    'commentLike',
    'follow',
    'commentAnswerLike',
    'subscriptions',
    'notifications',
    'messages',
    'dialogs',
  ],
})
