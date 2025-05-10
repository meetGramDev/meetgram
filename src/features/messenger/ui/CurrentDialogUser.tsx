import { PROFILE } from '@/shared/config/router'
import { Button } from '@/shared/ui'
import Link from 'next/link'

import { Avatar, AvatarProps } from './Avatar'

type Props = {
  id: number | string
  userName: string
} & AvatarProps

export const CurrentDialogUser = ({ avatar, id, userName }: Props) => {
  return (
    <div className={'ml-3 flex h-full w-full items-center'}>
      <div className={'flex items-center justify-between gap-3'}>
        <Avatar avatar={avatar} />
        <Button as={Link} href={`${PROFILE}/${id}`} variant={'link'}>
          {userName}
        </Button>
      </div>
    </div>
  )
}
