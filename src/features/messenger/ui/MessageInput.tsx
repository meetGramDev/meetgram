import { useState } from 'react'

import { Button, TextArea } from '@/shared/ui'

export const MessageInput = () => {
  const [message, setMessage] = useState('')

  return (
    <div className={'relative flex h-full w-full justify-between'}>
      <TextArea
        onChange={e => setMessage(e.currentTarget.value)}
        placeholder={'Type message...'}
        value={message}
      ></TextArea>
      <Button className={'b-0 absolute right-0 z-10'} variant={'text'}>
        Send message
      </Button>
    </div>
  )
}
