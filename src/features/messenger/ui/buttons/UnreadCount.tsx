import { cn } from '@/shared/lib'

import { FloatButton, FloatButtonProps } from './FloatButton'

type Props = {
  text?: string
  unread?: number
} & FloatButtonProps

export const UnreadCount = ({ className, text, unread = 0, ...rest }: Props) => {
  if (unread <= 0) {
    text = ''
  }

  if (unread >= 1) {
    text = 'new message'
  }

  if (unread >= 2) {
    text = 'new messages'
  }

  return (
    <FloatButton className={cn('min-w-[150px] max-w-[200px]', className)} {...rest}>
      <p
        className={
          'flex items-center gap-2 px-5 py-1 text-regular14 font-semibold text-light-100 transition-colors duration-300 group-active:text-light-700'
        }
      >
        <span className={'inline-block max-w-[50px] truncate'}>{unread || ''} </span>
        <span>{text}</span>
      </p>
    </FloatButton>
  )
}
