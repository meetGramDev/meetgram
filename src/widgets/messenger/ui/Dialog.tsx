import { Button } from '@/shared/ui'

import { Avatar, AvatarProps } from './Avatar'

type Props = {
  avatar?: { alt?: string; src?: string }
  lastMessage?: string
  time?: string
  userName?: string
} & AvatarProps

export const Dialog = ({ avatar, lastMessage, time, userName }: Props) => {
  return (
    <li className={'border-b border-dark-300 p-3 last:border-b-0 hover:bg-dark-100'}>
      <Button className={'text-regular14 text-light-100 no-underline'} variant={'link'}>
        <div className={'flex h-full items-center gap-3'}>
          <Avatar avatar={avatar} />
          <div className={'grid grid-cols-2 grid-rows-2 gap-2'}>
            <p className={'place-self-start font-bold'}>{userName}</p>
            <time className={'place-self-end text-light-900'}>{time}</time>
            <p className={'col-span-2 text-light-900'}>{lastMessage}</p>
          </div>
        </div>
      </Button>
    </li>
  )
}
