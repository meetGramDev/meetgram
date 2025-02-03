import { useEffect, useState } from 'react'

import { SearchDialogWithPagination } from '@/features/search'
import { useSearchUsersQuery } from '@/features/search/model/services/search.services'
import { useClientProgress } from '@/shared/lib'
import { NextPageWithLayout } from '@/shared/types'
import { Loader } from '@/shared/ui'
import { getMainLayout } from '@/widgets/layouts'
import { useRouter } from 'next/router'

const SearchUser: NextPageWithLayout = () => {
  const router = useRouter()

  const { pageNumber = '1', pageSize = '10', search = '' } = router.query
  const [searchStr, setSearchStr] = useState<string>(search as string)
  const [pageNumberState, setPageNumber] = useState<number>(Number(pageNumber))
  const [pageSizeState, setPageSize] = useState<number>(Number(pageSize))

  useEffect(() => {
    if (router.isReady) {
      setSearchStr(search as string)
      setPageSize(Number(pageSize))
      setPageNumber(Number(pageNumber))
    }
  }, [router.isReady, search, pageNumber, pageSize])

  useEffect(() => {
    router.replace(
      {
        pathname: router.pathname,
        query: { pageNumber: pageNumberState, pageSize: pageSizeState, search: searchStr },
      },
      undefined,
      { shallow: true }
    )
  }, [searchStr, pageNumberState, pageSizeState])

  const { data, isFetching, isLoading, isSuccess } = useSearchUsersQuery({
    cursor: 0,
    pageNumber: pageNumberState,
    pageSize: pageSizeState,
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
