import { useMemo, useState } from 'react'

import { ConfirmClosingDialog } from '@/features/dialog/confirmClosing'
import {
  AddDescription,
  AddImages,
  AddPostStage,
  addPostActions,
  selectAddPostStage,
  selectIsDialogOpen,
} from '@/features/profile/addPost'
import { useActions, useAppSelector } from '@/shared/config/storeHooks'
import { Dialog } from '@/shared/ui'

export const AddingPostView = () => {
  const open = useAppSelector(selectIsDialogOpen)
  const addPostStage = useAppSelector(selectAddPostStage)
  const { setOpenAddingPost } = useActions(addPostActions)

  const [openConfirmClosing, setOpenConfirmClosing] = useState(false)

  const handleOpenAddingPost = (isOpen: boolean) => {
    if (!isOpen) {
      setOpenConfirmClosing(true)
    }
    // setOpenAddingPost(value)
  }

  const handleCloseAddingPost = (isConfirm: boolean) => {
    if (isConfirm) {
      setOpenAddingPost(false)
      setOpenConfirmClosing(false)
    } else {
      setOpenConfirmClosing(false)
    }
  }

  const content = useMemo(() => {
    switch (addPostStage) {
      case AddPostStage.ADD: {
        return <AddImages />
      }
      case AddPostStage.DESCRIPTION: {
        return <AddDescription />
      }
    }
  }, [addPostStage])

  return (
    <>
      <Dialog
        onOpenChange={handleOpenAddingPost}
        open={open}
        title={addPostStage === AddPostStage.ADD ? 'Add Photo' : ''}
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
