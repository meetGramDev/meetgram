import { useState } from 'react'

import { useInfiniteScroll } from '@/shared/lib'
import { Loader } from '@/shared/ui'
import { useRouter } from 'next/router'

import { useGetAllDialogsQuery } from '../model/services/messagesApi.service'
import { Dialog } from './Dialog'

const MAX_DIALOGS_SIZE = 12

export const DialogList = () => {
  const router = useRouter()
  const [lastItemId, setLastItemId] = useState<null | number>(null)

  const { data, isError, isFetching, isLoading, isSuccess } = useGetAllDialogsQuery({
    cursor: lastItemId ?? undefined,
    pageSize: MAX_DIALOGS_SIZE,
  })

  const hasMoreItems = data?.items.length !== data?.totalCount
  const { ref } = useInfiniteScroll(
    () => {
      if (hasMoreItems && data?.items && data.items.length && data.items.at(-1)) {
        const lastItem = data.items.at(-1)

        if (lastItem) {
          setLastItemId(lastItem.id)
        }
      }
    },
    {
      threshold: 0.3,
    }
  )

  if (isLoading || isFetching) {
    return (
      <div className={'my-16 flex justify-center'}>
        <Loader />
      </div>
    )
  }

  if (isError) {
    return (
      <p className={'mt-16 text-pretty text-center text-regular16 text-danger-500'}>
        Cannot load dialogs
      </p>
    )
  }

  if (isSuccess) {
    return (
      <>
        {data.items.length > 0 ? (
          <ul>
            {data.items.map(d => (
              <Dialog dialog={d} key={d.id} locale={router.locale} />
            ))}
            {!hasMoreItems && (
              <li
                className={'mt-3 flex h-fit w-full justify-center'}
                key={'098_783jku$5-@'}
                ref={ref}
              >
                <Loader loaderClassName={'w-[30px] h-[30px]'} />
              </li>
            )}
          </ul>
        ) : (
          <p className={'mt-16 text-center'}>No dialogs</p>
        )}
      </>
    )
  }

  return null
}
