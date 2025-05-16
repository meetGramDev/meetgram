import { useState } from 'react'
import { toast } from 'react-toastify'

import { selectCurrentUserId, useGetPublicProfileByIdQuery } from '@/entities/user'
import { ChatScrollContainer } from '@/features/messenger/lib/ChatScrollContainer'
import { useAppSelector } from '@/shared/config/storeHooks'
import { cn } from '@/shared/lib'
import { skipToken } from '@reduxjs/toolkit/query'

import {
  useGetMessagesByUserQuery,
  useSendMessageMutation,
} from '../model/services/messagesApi.service'
import { EmptyDialog } from './EmptyDialog'
import { MessageBubble } from './MessageBubble'
import { MessageInput } from './MessageInput'

type Props = {
  className?: string
  dialoguePartnerId?: number
}

export const DialogWindow = ({ className, dialoguePartnerId }: Props) => {
  const currentUserId = useAppSelector(selectCurrentUserId)
  const { data, isError, isSuccess } = useGetMessagesByUserQuery(
    {
      dialoguePartnerId: dialoguePartnerId || 0,
    },
    { skip: !dialoguePartnerId }
  )
  const { data: userData, isSuccess: isUserDataSuccess } = useGetPublicProfileByIdQuery(
    String(dialoguePartnerId) ?? skipToken
  )

  const [latestMessage, setLatestMessage] = useState<null | string>(null)
  const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation()

  const resetAnimation = () => setTimeout(() => setLatestMessage(null), 300)

  const handleOnMessage = async (msg: string) => {
    if (!dialoguePartnerId) {
      return
    }

    try {
      sendMessage({ message: msg, receiverId: dialoguePartnerId })

      setLatestMessage(msg)
      resetAnimation()
    } catch (error) {
      toast.error('Ops, something went wrong. Cannot send message')
    }
  }

  if (isError) {
    return <EmptyDialog text={'Something went wrong, cannot load messages'} />
  }

  if (isSuccess) {
    return (
      <div className={'flex h-full w-full flex-col'}>
        {data.items.length > 0 && (
          <ChatScrollContainer
            className={cn('flex flex-col gap-6 overflow-y-auto overflow-x-hidden py-8', className)}
            isSending={!isSendingMessage}
          >
            {data.items.map(message => (
              <MessageBubble
                avatar={
                  isUserDataSuccess && userData.avatars.length
                    ? {
                        alt: `${userData.userName} photo`,
                        src: userData.avatars[1].url,
                      }
                    : undefined
                }
                className={cn(
                  message.messageText === latestMessage &&
                    `${message.ownerId === message.receiverId ? 'animate-popInRight' : 'animate-popInLeft'} `
                )}
                currentUserId={currentUserId}
                key={message.id}
                message={message}
              />
            ))}
          </ChatScrollContainer>
        )}
        <div className={'relative mt-auto w-full p-[2px]'}>
          <MessageInput disabled={isSendingMessage} onMessage={handleOnMessage} />
        </div>
      </div>
    )
  }

  return <EmptyDialog />
}
