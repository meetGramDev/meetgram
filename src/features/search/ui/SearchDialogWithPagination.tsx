import { SearchDialog, SearchDialogWithPaginationType } from '@/features/search'
import { UserFound } from '@/features/search/ui/UserFound'
import { Pagination } from '@/shared/ui/pagination/Pagination'

export const SearchDialogWithPagination = ({
  data,
  searchStr,
  setPageNumber,
  setPageSize,
  setSearchStr,
}: SearchDialogWithPaginationType) => {
  const usualOptions = [1, 5, 10, 20, 50, 100]

  const changingPageSize = data?.pageSize

  const finishOptions = [changingPageSize || 10, ...usualOptions]

  return (
    <>
      <h1 className={'pb-3'}>Search</h1>
      <SearchDialog onValueQuery={setSearchStr} />
      {searchStr === '' && <p className={'font-bold leading-6'}>All users</p>}
      {data &&
        data.items &&
        data.items.map(item => (
          <UserFound
            firstName={item.firstName || ''}
            key={item.id}
            lastName={item.lastName || ''}
            url={item.avatars[0]?.url}
            userId={item.id}
            userName={item.userName || 'User Name'}
          />
        ))}
      <div className={'ml-20 mr-20 mt-7'}>
        {data && (
          <Pagination
            currentPage={data.page}
            onPageChange={page => {
              setPageNumber(page)
            }}
            onPerPageChange={itemsPerPage => {
              setPageSize(itemsPerPage)
            }}
            options={finishOptions}
            pageCount={data.pagesCount}
          />
        )}
      </div>
    </>
  )
}
