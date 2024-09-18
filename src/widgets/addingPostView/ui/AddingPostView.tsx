import { useMemo, useState } from 'react'

import { ConfirmClosingDialog } from '@/features/dialog/confirmClosing'
import {
  AddDescription,
  AddImages,
  AddingPostStage,
  addPostActions,
  selectAddingPostStage,
  selectIsDialogOpen,
} from '@/features/profile/addPost'
import { useActions, useAppSelector } from '@/shared/config/storeHooks'
import { Dialog } from '@/shared/ui'

export const AddingPostView = () => {
  const open = useAppSelector(selectIsDialogOpen)
  const addingPostStage = useAppSelector(selectAddingPostStage)
  const { closeAddingPost } = useActions(addPostActions)

  const [openConfirmClosing, setOpenConfirmClosing] = useState(false)

  const handleOpenAddingPost = (isOpen: boolean) => {
    if (!isOpen) {
      setOpenConfirmClosing(true)
    }
  }

  const handleCloseAddingPost = (isConfirm: boolean) => {
    if (isConfirm) {
      setOpenConfirmClosing(false)
      closeAddingPost()
    } else {
      setOpenConfirmClosing(false)
    }
  }

  const content = useMemo(() => {
    switch (addingPostStage) {
      case AddingPostStage.ADD: {
        return <AddImages />
      }
      case AddingPostStage.DESCRIPTION: {
        return <AddDescription />
      }
    }
  }, [addingPostStage])

  return (
    <>
      <Dialog
        onOpenChange={handleOpenAddingPost}
        open={open}
        title={addingPostStage === AddingPostStage.ADD ? 'Add Photo' : ''}
      >
        {content}

        {openConfirmClosing && (
          <Dialog onOpenChange={setOpenConfirmClosing} open={openConfirmClosing} title={'Close'}>
            <ConfirmClosingDialog
              message={
                'Do you really want to close the creation of a publication? If you close everything will be deleted'
              }
              onConfirm={handleCloseAddingPost}
            />
          </Dialog>
        )}
      </Dialog>
    </>
  )
}
