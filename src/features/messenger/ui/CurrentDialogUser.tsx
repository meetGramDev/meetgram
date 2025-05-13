import { useGetPublicProfileByIdQuery } from '@/entities/user'
import { PROFILE } from '@/shared/config/router'
import { Button } from '@/shared/ui'
import { skipToken } from '@reduxjs/toolkit/query'
import Link from 'next/link'

import { Avatar } from './Avatar'

type Props = {
  id?: string
}

export const CurrentDialogUser = ({ id }: Props) => {
  const { data, isLoading, isSuccess } = useGetPublicProfileByIdQuery(id ?? skipToken)

  let innerHtml

  if (isLoading) {
    innerHtml = (
      <>
        <div className={'h-[48px] w-[48px] animate-pulse rounded-full bg-dark-100'}></div>
        <div className={'h-[32px] w-[180px] animate-pulse rounded-sm bg-dark-100'}></div>
      </>
    )
  }

  if (isSuccess) {
    innerHtml = (
      <>
        <Avatar
          avatar={{
            alt: `${data.userName} photo`,
            src: data.avatars.length > 0 ? data.avatars[1].url : undefined,
          }}
        />
        <Button as={Link} href={`${PROFILE}/${id}`} variant={'link'}>
          {data.userName}
        </Button>
      </>
    )
  }

  return (
    <div className={'ml-3 flex h-full w-full items-center'}>
      <div className={'flex items-center justify-between gap-3'}>{innerHtml}</div>
    </div>
  )
}
