import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { selectCurrentUserId, useGetPublicProfileByIdQuery } from '@/entities/user'
import { useAppSelector } from '@/shared/config/storeHooks'
import { cn, useInfiniteScroll } from '@/shared/lib'
import { Nullable } from '@/shared/types'
import { Loader } from '@/shared/ui'
import { skipToken } from '@reduxjs/toolkit/query'

import { ChatScrollContainer } from '../lib/ChatScrollContainer'
import { useAnimateMessageBubble } from '../lib/useAnimateMessageBubble'
import {
  useGetMessagesByUserQuery,
  useSendMessageMutation,
  useUpdateMessageStatusMutation,
} from '../model/services/messagesApi.service'
import { MessageStatus } from '../model/types'
import { EmptyDialog } from './EmptyDialog'
import { MessageBubble } from './MessageBubble'
import { MessageInput } from './MessageInput'

type Props = {
  className?: string
  dialoguePartnerId?: string
}

const MESSAGES_PER_PAGE = 12

export const DialogWindow = ({ className, dialoguePartnerId }: Props) => {
  const currentUserId = useAppSelector(selectCurrentUserId)

  const [cursor, setCursor] = useState<Nullable<number>>(null)
  const { data, isError, isLoading, isSuccess } = useGetMessagesByUserQuery(
    {
      cursor: cursor ?? undefined,
      dialoguePartnerId: +(dialoguePartnerId ?? 0),
      pageSize: MESSAGES_PER_PAGE,
    },
    { skip: !dialoguePartnerId }
  )
  const { data: userData, isSuccess: isUserDataSuccess } = useGetPublicProfileByIdQuery(
    dialoguePartnerId ?? skipToken
  )

  const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation()
  const [updateMessageStatus] = useUpdateMessageStatusMutation()

  const { latestMessage, resetAnimation, setLatestMessage } = useAnimateMessageBubble()

  const containerRef = useRef<Nullable<HTMLDivElement>>(null)

  const hasMoreItems = data?.items.length !== data?.totalCount
  const { ref: scrollRef } = useInfiniteScroll(
    () => {
      if (data && data.items.length && hasMoreItems) {
        const firstEl = data.items.at(0)

        firstEl && setCursor(firstEl.id)
      }
    },
    {
      root: containerRef.current,
      rootMargin: `100px`,
      threshold: 0.3,
    }
  )

  const handleOnMessage = async (msg: string) => {
    if (!dialoguePartnerId) {
      return
    }

    try {
      sendMessage({ message: msg, receiverId: +dialoguePartnerId })

      setLatestMessage(msg)
      resetAnimation()
    } catch (error) {
      toast.error('Ops, something went wrong. Cannot send message')
    }
  }

  // read sent messages when data received or component mounted
  useEffect(() => {
    if (isLoading || !data || !data?.items) {
      return
    }

    const idsToUpdate = data.items.reduce((acc: number[], item) => {
      if (currentUserId !== item.ownerId && item.status !== MessageStatus.READ) {
        acc.push(item.id)
      }

      return acc
    }, [])

    if (idsToUpdate.length !== 0) {
      updateMessageStatus({ ids: idsToUpdate })
    }
  }, [isLoading, data?.items])

  if (isError) {
    return <EmptyDialog text={'Something went wrong, cannot load messages'} />
  }

  if (isSuccess) {
    return (
      <div className={'flex h-full w-full flex-col'}>
        {data.items.length > 0 && (
          <ChatScrollContainer
            className={cn(
              'h-ful relative flex flex-col gap-6 overflow-y-auto overflow-x-hidden py-8',
              className
            )}
            isSending={!isSendingMessage}
            ref={containerRef}
          >
            {() => (
              <>
                {hasMoreItems && (
                  <div className={'mb-3 flex h-fit w-full justify-center'} ref={scrollRef}>
                    <Loader loaderClassName={'w-[30px] h-[30px]'} />
                  </div>
                )}
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
              </>
            )}
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
