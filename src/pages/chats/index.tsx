import { useState } from 'react'

import {
  CurrentDialogUser,
  DialogList,
  DialogWindow,
  MessageStatus,
  MessageType,
} from '@/features/messenger'
import { NextPageWithLayout } from '@/shared/types'
import { Card } from '@/shared/ui'
import { getMainLayout } from '@/widgets/layouts'
import { DebounceSearch } from '@meetgram/ui-kit'

const Chats: NextPageWithLayout = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className={'mb-10 ml-6 mr-16 mt-8'}>
      <div
        className={
          'flex h-[calc(100vh-theme(spacing.10)-theme(spacing.8)-theme(spacing.3)-3.75rem)] flex-col'
        }
      >
        <Card
          className={
            'grid h-full w-full flex-grow grid-cols-[270px_minmax(0,1fr)] grid-rows-[72px_1fr]'
          }
        >
          <div className={'flex items-center border-b border-r border-dark-300 px-3 pt-6'}>
            <DebounceSearch defaultValue={searchQuery} onValueQuery={setSearchQuery} />
          </div>
          <div className={'col-start-1 row-start-2 overflow-y-auto border-r border-dark-300'}>
            <DialogList />
          </div>
          <div className={'col-start-2 border-b border-dark-300'}>
            <CurrentDialogUser id={'1'} userName={'userName'} />
          </div>
          <div
            className={
              'col-start-2 row-start-2 h-full overflow-y-hidden border-r border-dark-300 bg-black'
            }
          >
            {/*<EmptyDialog />*/}
            <DialogWindow />
          </div>
        </Card>
      </div>
    </div>
  )
}

Chats.getLayout = getMainLayout

export default Chats
