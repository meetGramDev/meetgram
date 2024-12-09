import { useEffect, useState } from 'react'

import { SearchDialogWithPaginationType } from '@/features/search'
import { UserFound } from '@/features/search/ui/UserFound'
import { Input } from '@/shared/ui'
import { Pagination } from '@/shared/ui/pagination/Pagination'

export const SearchDialogWithPagination = ({
  data,
  searchStr,
  setPageNumber,
  setPageSize,
  setSearchStr,
}: SearchDialogWithPaginationType) => {
  return (
    <>
      <h1 className={'pb-3'}>Search</h1>
      <DebounceInput onValueQuery={setSearchStr} />
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
            options={[1, 5, 10, 20, 50, 100]}
            pageCount={data.pagesCount}
          />
        )}
      </div>
    </>
  )
}

type DebounceInputProps = {
  onValueQuery: (value: string) => void
}
const DebounceInput = ({ onValueQuery }: DebounceInputProps) => {
  const [timerId, setTimerId] = useState(0)
  const [str, setStr] = useState('')

  useEffect(() => {
    setTimerId(
      +setTimeout(() => {
        onValueQuery(str)
      }, 1500)
    )

    return clearTimeout(timerId)
  }, [str])

  const onChangeValue = (value: string) => {
    setStr(value)
  }

  return (
    <>
      <Input
        className={'mb-6'}
        onChange={e => onChangeValue(e.currentTarget.value)}
        placeholder={'Search'}
        type={'search'}
      />
    </>
  )
}
