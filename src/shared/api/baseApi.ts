import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from './baseUrl'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: headers => {
      const accessToken = localStorage.getItem('accessToken')

      if (accessToken) {
        headers.set('authorization', `Bearer ${JSON.parse(accessToken)}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'meetGramApi',
  tagTypes: ['login', 'auth'],
})
