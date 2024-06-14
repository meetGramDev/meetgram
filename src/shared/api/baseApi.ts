import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from './baseUrl'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({}),
  reducerPath: 'meetGramApi',
  tagTypes: ['login', 'auth'],
})
