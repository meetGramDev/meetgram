import { ChangeEvent, useState } from 'react'

import { Button, TextArea } from '@/shared/ui'

type Props = {
  onMessage?: (message: string) => void
}

export const MessageInput = ({ onMessage }: Props) => {
  const [message, setMessage] = useState('')

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value)
    onMessage?.(e.currentTarget.value)
  }

  return (
    <>
      <TextArea
        className={'border-x-0 border-b-0 border-dark-300 bg-dark-900'}
        onChange={handleMessageChange}
        placeholder={'Type message...'}
        value={message}
      />
      {message && (
        <Button className={'absolute right-3 top-1/2 z-10 -translate-y-1/2'} variant={'text'}>
          Send message
        </Button>
      )}
    </>
  )
}
