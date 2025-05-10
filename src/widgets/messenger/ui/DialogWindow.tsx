import { cn } from '@/shared/lib'

import { MessageStatus, MessageType } from '../model/types'
import { MessageBubble } from './MessageBubble'

type Props = {
  className?: string
  messages: {
    createdAt: Date
    id: number | string
    isYours?: boolean
    messageType: MessageType
    status: MessageStatus
    text: string
  }[]
}

export const DialogWindow = ({ className, messages }: Props) => {
  return (
    <div className={cn('flex h-full flex-col gap-6 overflow-y-auto py-8', className)}>
      {messages.map(message => (
        <MessageBubble
          id={message.id}
          isYours={message.isYours}
          key={message.id}
          message={message.text}
          messageType={message.messageType}
          status={message.status}
          time={message.createdAt.toLocaleTimeString()}
        />
      ))}
    </div>
  )
}
