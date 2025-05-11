import { Checkmark } from '@/shared/assets/icons/Checkmark'
import { DoneAll } from '@/shared/assets/icons/DoneAll'
import { cn } from '@/shared/lib'

import { MessageStatus, MessageType } from '../model/types'
import { Avatar, AvatarProps } from './Avatar'

type Props = {
  id: number | string
  isSent?: boolean
  message: string
  messageType: MessageType
  status: MessageStatus
  time: string
} & AvatarProps

const ICON_SIZE = 16

export const MessageBubble = ({ avatar, isSent, message, messageType, status, time }: Props) => {
  return (
    <div className={cn('flex items-end gap-3 pl-6', isSent && 'justify-end pr-6')}>
      {!isSent && <Avatar avatar={avatar} size={36} />}
      <div
        className={cn(
          'flex min-w-[150px] max-w-[360px] flex-col rounded-lg bg-dark-300 px-3 py-2',
          isSent && 'bg-accent-900'
        )}
      >
        <p className={'text-pretty'}>{message}</p>
        <span
          className={cn(
            'inline-flex items-center gap-1 self-end text-end text-[12px] leading-4 text-light-900 transition-colors duration-300',
            isSent && 'text-accent-100'
          )}
        >
          <time>{time}</time>
          {isSent && (
            <span
              className={cn('text-light-900', status === MessageStatus.READ && 'text-accent-100')}
            >
              {status === MessageStatus.SENT && <Checkmark height={ICON_SIZE} width={ICON_SIZE} />}
              {(status === MessageStatus.RECEIVED || status === MessageStatus.READ) && (
                <DoneAll height={ICON_SIZE} width={ICON_SIZE} />
              )}
            </span>
          )}
        </span>
      </div>
    </div>
  )
}
