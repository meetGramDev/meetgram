import { useState } from 'react'

import { CurrentDialogUser, DialogList, DialogWindow } from '@/features/messenger'
import { NextPageWithLayout } from '@/shared/types'
import { Card } from '@/shared/ui'
import { getMainLayout } from '@/widgets/layouts'
import { DebounceSearch } from '@meetgram/ui-kit'
import { useRouter } from 'next/router'

const Chats: NextPageWithLayout = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const query = router.query as { dialog: string }

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
            <DialogList dialoguePartnerId={query.dialog} />
          </div>
          <div className={'col-start-2 border-b border-dark-300'}>
            <CurrentDialogUser id={query.dialog} key={query.dialog} />
          </div>
          <div
            className={
              'col-start-2 row-start-2 h-full overflow-y-hidden border-r border-dark-300 bg-black'
            }
          >
            <DialogWindow dialoguePartnerId={query.dialog} key={query.dialog} />
          </div>
        </Card>
      </div>
    </div>
  )
}

Chats.getLayout = getMainLayout

export default Chats
