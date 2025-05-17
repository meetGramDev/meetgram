import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'

import { cn } from '@/shared/lib'
import { TextArea } from '@/shared/ui'

import { SendButton } from './buttons/SendButton'

type Props = {
  disabled?: boolean
  onMessage?: (message: string) => void
}

const ANIMATION_DURATION = 300
const ANIMATION_DELAY = 10

export const MessageInput = ({ disabled, onMessage }: Props) => {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [shouldRender, setShouldRender] = useState(true)
  const [shouldShowSendBtn, setShouldShowSendBtn] = useState(false)

  const registerMessage = (value?: string) => {
    onMessage?.(value ?? message)
    setMessage('')
    setShouldShowSendBtn(false)
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
    const trimmedValue = e.currentTarget.value.trim()

    setMessage(e.currentTarget.value)
    if (trimmedValue) {
      setShouldRender(true)
      // Use a small timeout to ensure the DOM is updated before starting animation
      setTimeout(() => setShouldShowSendBtn(true), ANIMATION_DELAY)
    } else {
      setShouldShowSendBtn(false)
    }
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

  // Handle the removal of send btns after animation completes
  useEffect(() => {
    if (!shouldShowSendBtn) {
      const timer = setTimeout(() => setShouldRender(false), ANIMATION_DURATION)

      return () => clearTimeout(timer)
    } else {
      setShouldRender(true)
    }
  }, [shouldShowSendBtn])

  return (
    <>
      <TextArea
        className={
          'max-h-20 min-h-12 overflow-auto border-x-0 border-b-0 border-dark-300 bg-dark-900 pr-[114px] placeholder:text-light-900'
        }
        disabled={disabled}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
        placeholder={'Type message... (shift+enter to send)'}
        ref={textareaRef}
        rows={1}
        value={message}
      />
      <div
        className={`absolute right-5 top-1/2 z-10 -translate-y-1/2 transform overflow-x-hidden transition-all duration-${ANIMATION_DURATION} ease-in-out`}
      >
        {shouldRender ? (
          <SendButton
            className={cn(
              shouldShowSendBtn ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            )}
            disabled={disabled}
            onClick={() => registerMessage(message.trim())}
            type={'button'}
          />
        ) : (
          <div
            className={cn(
              'flex gap-3',
              !shouldShowSendBtn ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            )}
          >
            <SendButton
              btnType={'VOICE'}
              className={'text-light-100'}
              disabled={disabled}
              type={'button'}
            />
            <SendButton
              btnType={'IMAGE'}
              className={'text-light-100'}
              disabled={disabled}
              type={'button'}
            />
          </div>
        )}
      </div>
    </>
  )
}
