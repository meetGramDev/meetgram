import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'

import { TextArea } from '@/shared/ui'

import { SendButton } from './buttons/SendButton'

type Props = {
  onMessage?: (message: string) => void
}

export const MessageInput = ({ onMessage }: Props) => {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const registerMessage = (value?: string) => {
    onMessage?.(value ?? message)
    setMessage('')
  }

  // Adjust height based on content
  const adjustHeight = () => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto'
      // Set the height to match the content (scrollHeight)
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = e.currentTarget.value

    setMessage(currentValue)
    onMessage?.(currentValue.trim())
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const currentValue = e.currentTarget.value.trim()

    if (!currentValue) {
      return
    }

    if (e.key === 'Enter') {
      if (e.shiftKey) {
        e.preventDefault()
        registerMessage(currentValue)
      }
    }
  }

  useEffect(() => {
    adjustHeight()
  }, [message])

  return (
    <>
      <TextArea
        className={
          'max-h-20 min-h-12 overflow-auto border-x-0 border-b-0 border-dark-300 bg-dark-900 pr-[114px] placeholder:text-light-900'
        }
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
        placeholder={'Type message... (shift+enter to send)'}
        ref={textareaRef}
        rows={1}
        value={message}
      />
      <div className={'absolute right-5 top-1/2 z-10 -translate-y-1/2'}>
        {message.trim() ? (
          <SendButton onClick={() => registerMessage(message.trim())} type={'button'} />
        ) : (
          <div className={'flex gap-3'}>
            <SendButton btnType={'VOICE'} className={'text-light-100'} />
            <SendButton btnType={'IMAGE'} className={'text-light-100'} />
          </div>
        )}
      </div>
    </>
  )
}
