import { useState } from 'react'

import { ChatScrollContainer } from '@/features/messenger/lib/ChatScrollContainer'
import { cn } from '@/shared/lib'
import { useRouter } from 'next/router'

import { formatDateISOToTime } from '../lib/formatDateISOToTime'
import { MessageStatus, MessageType } from '../model/types'
import { MessageBubble } from './MessageBubble'
import { MessageInput } from './MessageInput'

const messages: {
  createdAt: string
  id: number | string
  isYours?: boolean
  messageType: MessageType
  status: MessageStatus
  text: string
}[] = [
  {
    createdAt: '2025-05-09T01:33:29.809Z',
    id: 1,
    messageType: MessageType.TEXT,
    status: MessageStatus.SENT,
    text: 'Hi! How are you?',
  },
  {
    createdAt: '2025-05-09T10:36:00.809Z',
    id: 2,
    isYours: true,
    messageType: MessageType.TEXT,
    status: MessageStatus.READ,
    text: 'Hi! I’m fine! Did you go into space yesterday? :D',
  },
  {
    createdAt: '2025-05-10T15:51:39.809Z',
    id: 3,
    messageType: MessageType.TEXT,
    status: MessageStatus.READ,
    text: "Ahahahahaha, just kidding! I'm still just learning to fly and code :D",
  },
]
let isYours = true

type Props = {
  className?: string
}

export const DialogWindow = ({ className }: Props) => {
  const [value, setValue] = useState(messages)

  const [latestMessageId, setLatestMessageId] = useState<null | number>(null)

  const router = useRouter()

  const resetAnimation = () => setTimeout(() => setLatestMessageId(null), 300)

  const handleOnMessage = (msg: string) => {
    const id = Math.random()

    setValue(oldValue => [
      ...oldValue,
      {
        createdAt: new Date().toISOString(),
        id,
        isYours,
        messageType: MessageType.TEXT,
        status: MessageStatus.SENT,
        text: msg,
      },
    ])
    isYours = !isYours

    setLatestMessageId(id)
    resetAnimation()
  }

  return (
    <div className={'flex h-full w-full flex-col'}>
      <ChatScrollContainer
        className={cn('flex flex-col gap-6 overflow-y-auto overflow-x-hidden py-8', className)}
        isSending
      >
        {value.map(message => (
          <MessageBubble
            className={cn(
              message.id === latestMessageId &&
                `${message.isYours ? 'animate-popInRight' : 'animate-popInLeft'} `
            )}
            id={message.id}
            isSent={message.isYours}
            key={message.id}
            message={message.text}
            messageType={message.messageType}
            status={message.status}
            time={formatDateISOToTime(new Date(message.createdAt), router.locale)}
          />
        ))}
      </ChatScrollContainer>
      <div className={'relative mt-auto w-full p-[2px]'}>
        <MessageInput onMessage={handleOnMessage} />
      </div>
    </div>
  )
}
