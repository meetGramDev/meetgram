import { cn } from '@/shared/lib'

import { MessageStatus, MessageType } from '../model/types'
import { Avatar, AvatarProps } from './Avatar'

type Props = {
  id: number | string
  isYours?: boolean
  message: string
  messageType: MessageType
  status: MessageStatus
  time: string
} & AvatarProps

export const MessageBubble = ({ avatar, isYours, message, messageType, status, time }: Props) => {
  return (
    <div className={cn('flex items-end gap-3 pl-6', isYours && 'justify-end pr-6')}>
      {!isYours && <Avatar avatar={avatar} size={36} />}
      <div
        className={cn(
          'flex min-w-[150px] max-w-[360px] flex-col rounded-lg bg-dark-300 px-3 py-2',
          isYours && 'bg-accent-900'
        )}
      >
        <p className={'text-pretty'}>{message}</p>
        <time
          className={cn(
            'self-end text-end text-small text-light-900',
            isYours && 'text-accent-100'
          )}
        >
          {time}
        </time>
      </div>
    </div>
  )
}
