import { Checkmark } from '@/shared/assets/icons/Checkmark'
import { DoneAll } from '@/shared/assets/icons/DoneAll'
import { cn } from '@/shared/lib'
import { Nullable } from '@/shared/types'
import { useRouter } from 'next/router'

import { formatDateISOToTime } from '../lib/formatDateISOToTime'
import { MessageModelType, MessageStatus } from '../model/types'
import { Avatar, AvatarProps } from './Avatar'

type Props = {
  className?: string
  currentUserId: Nullable<number>
  message: MessageModelType
} & AvatarProps

const ICON_SIZE = 16

export const MessageBubble = ({ avatar, className, currentUserId, message }: Props) => {
  const router = useRouter()
  const isSent = message.ownerId === currentUserId

  return (
    <div className={cn('flex items-end gap-3 pl-6', isSent && 'justify-end pr-6', className)}>
      {!isSent && <Avatar avatar={avatar} size={36} />}
      <div
        className={cn(
          'flex min-w-[150px] max-w-[360px] flex-col rounded-lg bg-dark-300 px-3 py-2',
          isSent && 'bg-accent-900'
        )}
      >
        <p className={'whitespace-pre-wrap text-pretty break-words'}>{message.messageText}</p>
        <span
          className={cn(
            'inline-flex items-center gap-1 self-end text-end text-[12px] leading-4 text-light-900 transition-colors duration-300',
            isSent && 'text-accent-100'
          )}
        >
          <time>{formatDateISOToTime(new Date(message.updatedAt), router.locale)}</time>
          {isSent && (
            <span
              className={cn(
                'text-light-900',
                message.status === MessageStatus.READ && 'text-accent-100'
              )}
            >
              {message.status === MessageStatus.SENT && (
                <Checkmark height={ICON_SIZE} width={ICON_SIZE} />
              )}
              {(message.status === MessageStatus.RECEIVED ||
                message.status === MessageStatus.READ) && (
                <DoneAll height={ICON_SIZE} width={ICON_SIZE} />
              )}
            </span>
          )}
        </span>
      </div>
    </div>
  )
}
