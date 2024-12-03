import { useEffect, useState } from 'react'

import { Photo } from '@/entities/photo'
import { UsersListDialog } from '@/features/pagination'
import { useSearchUsersQuery } from '@/features/search/model/services/search.services'
import notUserPhoto from '@/shared/assets/img/not-photo-user.jpg'
import { HOME } from '@/shared/config/router'
import { NextPageWithLayout } from '@/shared/types'
import { Button, Input } from '@/shared/ui'
import { getMainLayout } from '@/widgets/layouts'
import Link from 'next/link'

const SearchUser: NextPageWithLayout = () => {
  const [str, setStr] = useState('')
  const [searchStr, setSearchStr] = useState('')
  const [timerId, setTimerId] = useState(0)
  const { data, isFetching, isLoading, isSuccess } = useSearchUsersQuery({ searchQuery: searchStr })

  useEffect(() => {
    setTimerId(
      +setTimeout(() => {
        setSearchStr(str)
      }, 1500)
    )

    return clearTimeout(timerId)
  }, [str])

  return (
    <div>
      <h1>Search</h1>
      {/*<SearchDialog />*/}
      <Input onChange={e => setStr(e.currentTarget.value)} placeholder={'Search'} type={'search'} />
      Recent requests
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
    </div>
  )
}

SearchUser.getLayout = getMainLayout

export default SearchUser
