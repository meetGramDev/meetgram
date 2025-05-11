import { Button } from '@/shared/ui'

import { LastMessageViewType } from '../model/types'
import { Avatar } from './Avatar'

export type DialogProps = {
  dialog: LastMessageViewType
}

export const Dialog = ({ dialog }: DialogProps) => {
  return (
    <li className={'border-b border-dark-300 p-3 last:border-b-0 hover:bg-dark-100'}>
      <Button className={'text-regular14 text-light-100 no-underline'} variant={'link'}>
        <div className={'flex h-full items-center gap-3'}>
          <Avatar avatar={{ alt: `${dialog.userName}'s photo`, src: dialog.avatars[0].url }} />
          <div className={'grid grid-cols-2 grid-rows-2 gap-2'}>
            <p className={'place-self-start font-bold'}>{dialog.userName}</p>
            <time className={'place-self-end text-light-900'}>{dialog.updatedAt}</time>
            <p className={'col-span-2 text-light-900'}>{dialog.messageText}</p>
          </div>
        </div>
      </Button>
    </li>
  )
}
