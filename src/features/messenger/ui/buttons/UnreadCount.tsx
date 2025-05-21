type Props = {
  text?: string
  unread?: number
}

export const UnreadCount = ({ text, unread = 0 }: Props) => {
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
    <p
      className={
        'flex items-center gap-2 px-5 py-1 text-regular14 font-semibold text-light-100 transition-colors duration-300 group-active:text-light-700'
      }
    >
      <span className={'inline-block max-w-[50px] truncate'}>{unread || ''} </span>
      <span>{text}</span>
    </p>
  )
}
