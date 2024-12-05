import { ChangeEvent, useEffect, useState } from 'react'

import { Photo } from '@/entities/photo'
import { UsersListDialog } from '@/features/pagination'
import { SearchDialog } from '@/features/search'
import { useSearchUsersQuery } from '@/features/search/model/services/search.services'
import notUserPhoto from '@/shared/assets/img/not-photo-user.jpg'
import { HOME } from '@/shared/config/router'
import { NextPageWithLayout } from '@/shared/types'
import { Button, Input } from '@/shared/ui'
import { Pagination } from '@/shared/ui/pagination/Pagination'
import { getMainLayout } from '@/widgets/layouts'
import Link from 'next/link'

const SearchUser: NextPageWithLayout = () => {
  const [str, setStr] = useState('')
  const [searchStr, setSearchStr] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [timerId, setTimerId] = useState(0)
  const { data, isFetching, isLoading, isSuccess } = useSearchUsersQuery({
    cursor: 0,
    pageNumber,
    pageSize,
    searchQuery: searchStr,
  })

  useEffect(() => {
    setTimerId(
      +setTimeout(() => {
        setSearchStr(str)
      }, 1500)
    )

    return clearTimeout(timerId)
  }, [str])

  const onChangeValue = (value: string) => {
    setStr(value)
  }

  return (
    <div className={'pl-6 pt-8'}>
      <h1 className={'pb-3'}>Search</h1>
      <SearchDialog onValueChange={onChangeValue} placeholder={'Search'} type={'search'} />
      <p className={'font-bold leading-6'}>Recent requests</p>
      {data &&
        data.items &&
        data.items.map(item => (
          <div key={item.id}>
            {' '}
            <Button
              as={Link}
              className={'flex items-start justify-start text-light-100'}
              href={`${HOME}/${item.id}`}
              variant={'text'}
            >
              <div className={'mt-[12px] flex'}>
                <Photo
                  alt={'Friend avatar'}
                  height={36}
                  src={item.avatars[0]?.url || notUserPhoto}
                  width={36}
                />
                <h2
                  className={
                    'ml-[12px] flex items-center justify-center text-[16px] font-bold leading-6'
                  }
                >
                  {item.userName}
                </h2>
              </div>
            </Button>
          </div>
        ))}
      <div className={'mt-5'}>
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
    </div>
  )
}

SearchUser.getLayout = getMainLayout

export default SearchUser
