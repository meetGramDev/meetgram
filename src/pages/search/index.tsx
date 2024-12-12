import { useState } from 'react'

import { SearchDialogWithPagination } from '@/features/search'
import { useSearchUsersQuery } from '@/features/search/model/services/search.services'
import { useClientProgress } from '@/shared/lib'
import { NextPageWithLayout } from '@/shared/types'
import { Loader } from '@/shared/ui'
import { getMainLayout } from '@/widgets/layouts'

const SearchUser: NextPageWithLayout = () => {
  const [searchStr, setSearchStr] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { data, isFetching, isLoading, isSuccess } = useSearchUsersQuery({
    cursor: 0,
    pageNumber,
    pageSize,
    searchQuery: searchStr,
  })

  useClientProgress(isLoading || isFetching)
  if (isLoading) {
    return <Loader loaderClassName={'mx-auto my-80'} />
  }

  return (
    <div className={'pl-6 pt-8'}>
      <SearchDialogWithPagination
        data={data}
        searchStr={searchStr}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        setSearchStr={setSearchStr}
      />
    </div>
  )
}

SearchUser.getLayout = getMainLayout

export default SearchUser
