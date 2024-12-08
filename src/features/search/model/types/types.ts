import { SearchUserType } from '@/features/search/model/services/search.services'
import { PaginationType } from '@/shared/types'

export type UserFoundPropsType = {
  firstName?: string
  key: number
  lastName?: string
  url?: string
  userId: number
  userName?: string
}
export type SearchDialogWithPaginationType = {
  data?: PaginationType<SearchUserType>
  setPageNumber: (value: number) => void
  setPageSize: (value: number) => void
  setSearchStr: (value: string) => void
}
