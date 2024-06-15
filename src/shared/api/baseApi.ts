import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from './baseUrl'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: headers => {
      headers.set('Access-Control-Allow-Origin', '*')

      return headers
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'meetGramApi',
  tagTypes: ['login', 'auth'],
})
