import { formatDateISOToTime } from '@/features/messenger/lib/formatDateISOToTime'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui'
import Link from 'next/link'

import { LastMessageViewType } from '../model/types'
import { Avatar } from './Avatar'

export type DialogProps = {
  dialog: LastMessageViewType
  isHighlighted?: boolean
  isLastMsgYours: boolean
  isSelected: boolean
  linkTo: string
  locale?: string
  onClick?: () => void
}

export const Dialog = ({
  dialog,
  isHighlighted,
  isLastMsgYours,
  isSelected,
  linkTo,
  locale,
  onClick,
}: DialogProps) => {
  return (
    <li
      className={cn(
        'border-b border-dark-300 p-3 transition-colors duration-300 last:border-b-0 hover:bg-dark-100',
        isSelected && 'bg-dark-100'
      )}
    >
      <Button
        as={Link}
        className={'block w-full text-regular14 text-light-100 no-underline'}
        href={linkTo}
        onClick={onClick}
        variant={'link'}
      >
        <div className={'relative flex h-full items-center gap-3'}>
          <Avatar
            avatar={{
              alt: `${dialog.userName}'s photo`,
              src: dialog.avatars.length ? dialog.avatars[1].url : undefined,
            }}
          />
          <div className={'grid w-full grid-cols-2 grid-rows-2 gap-2'}>
            <p className={'place-self-start font-bold'}>{dialog.userName}</p>
            <time className={'place-self-end text-light-900'}>
              {formatDateISOToTime(new Date(dialog.updatedAt), locale, { showTime: false })}
            </time>
            {!isSelected ? (
              <p
                className={cn(
                  'col-span-2 truncate text-light-900',
                  isHighlighted && 'font-bold text-light-300'
                )}
              >
                {isLastMsgYours ? (
                  <>
                    <span className={'font-bold'}>You: </span>
                    {dialog.messageText}
                  </>
                ) : (
                  <>
                    <span
                      className={cn(
                        isHighlighted &&
                          'after:absolute after:right-0 after:h-2 after:w-2 after:animate-pulse after:rounded-full after:bg-accent-500'
                      )}
                    >
                      {dialog.messageText}
                    </span>
                  </>
                )}
              </p>
            ) : (
              <p className={'colspan-2 font-bold text-light-900'}>Active now</p>
            )}
          </div>
        </div>
      </Button>
    </li>
  )
}
