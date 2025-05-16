import { formatDateISOToTime } from '@/features/messenger/lib/formatDateISOToTime'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui'
import Link from 'next/link'

import { LastMessageViewType } from '../model/types'
import { Avatar } from './Avatar'

export type DialogProps = {
  dialog: LastMessageViewType
  isLastMsgYours: boolean
  isSelected: boolean
  linkTo: string
  locale?: string
}

export const Dialog = ({ dialog, isLastMsgYours, isSelected, linkTo, locale }: DialogProps) => {
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
        variant={'link'}
      >
        <div className={'flex h-full items-center gap-3'}>
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
              <p className={'col-span-2 truncate text-light-900'}>
                {isLastMsgYours ? (
                  <>
                    <span className={'font-bold'}>You: </span>
                    {dialog.messageText}
                  </>
                ) : (
                  dialog.messageText
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
