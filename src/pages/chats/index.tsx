import { useState } from 'react'

import { CurrentDialogUser, DialogList, DialogWindow } from '@/features/messenger'
import { MessageStatus, MessageType } from '@/features/messenger/model/types'
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
            className={'col-start-2 row-start-2 h-full border-b border-r border-dark-300 bg-black'}
          >
            {/*<EmptyDialog />*/}
            <DialogWindow
              messages={[
                {
                  createdAt: new Date(),
                  id: 1,
                  messageType: MessageType.TEXT,
                  status: MessageStatus.SENT,
                  text: 'Hi! How are you?',
                },
                {
                  createdAt: new Date(),
                  id: 1,
                  isYours: true,
                  messageType: MessageType.TEXT,
                  status: MessageStatus.RECEIVED,
                  text: 'Hi! I’m fine! Did you go into space yesterday? :D',
                },
                {
                  createdAt: new Date(),
                  id: 1,
                  messageType: MessageType.TEXT,
                  status: MessageStatus.READ,
                  text: "Ahahahahaha, just kidding! I'm still just learning to fly and code :D",
                },
                {
                  createdAt: new Date(),
                  id: 1,
                  messageType: MessageType.TEXT,
                  status: MessageStatus.READ,
                  text: 'Another text',
                },
                {
                  createdAt: new Date(),
                  id: 1,
                  messageType: MessageType.TEXT,
                  status: MessageStatus.READ,
                  text: 'Another text',
                },
                {
                  createdAt: new Date(),
                  id: 1,
                  messageType: MessageType.TEXT,
                  status: MessageStatus.READ,
                  text: 'Another text',
                },
                {
                  createdAt: new Date(),
                  id: 1,
                  messageType: MessageType.TEXT,
                  status: MessageStatus.READ,
                  text: 'Another text',
                },
                {
                  createdAt: new Date(),
                  id: 1,
                  messageType: MessageType.TEXT,
                  status: MessageStatus.READ,
                  text: 'Another text',
                },
                {
                  createdAt: new Date(),
                  id: 1,
                  messageType: MessageType.TEXT,
                  status: MessageStatus.READ,
                  text: 'Another text',
                },
                {
                  createdAt: new Date(),
                  id: 1,
                  messageType: MessageType.TEXT,
                  status: MessageStatus.READ,
                  text: 'Another text',
                },
              ]}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}

Chats.getLayout = getMainLayout

export default Chats
