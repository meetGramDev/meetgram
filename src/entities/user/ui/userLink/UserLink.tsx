import { Photo } from '@/entities/photo'
import { Avatar } from '@/shared/types'
import Link from 'next/link'

import s from './UserLink.module.scss'

import noPhoto from '../../../../shared/assets/img/not-photo-user.jpg'

type Props = {
  avatars: Avatar[]
  userId: number
  userName: string
}

export const UserLink = ({ avatars, userId, userName }: Props) => {
  return (
    <Link className={s.link} href={`/profile/${userId}`}>
      <Photo
        alt={'user'}
        height={36}
        src={avatars.length ? avatars[1].url : noPhoto}
        variant={'round'}
        width={36}
      />
      <span className={'overflow-hidden text-ellipsis text-regular16 font-normal text-inherit'}>
        {userName}
      </span>
    </Link>
  )
}
