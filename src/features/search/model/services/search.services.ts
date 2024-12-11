import { baseApi } from '@/shared/api'
import { Avatar, PaginationQueriesType, PaginationType } from '@/shared/types'

const searchService = baseApi.injectEndpoints({
  endpoints: builder => ({
    searchUsers: builder.query<PaginationType<SearchUserType>, PaginationQueriesType>({
      query: body => ({
        method: 'GET',
        url: `/users2?search=${body.searchQuery}&pageSize=${body.pageSize}&pageNumber=${body.pageNumber}&cursor=${body.cursor}`,
      }),
    }),
  }),
})

export const { useSearchUsersQuery } = searchService

export type SearchUserType = {
  avatars: Avatar[]
  firstName: string
  id: number
  lastName: string
  userName: string
}
