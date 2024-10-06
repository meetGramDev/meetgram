import { useMemo, useState } from 'react'

import { ConfirmClosingDialog } from '@/features/dialog/confirmClosing'
import {
  AddDescription,
  AddImages,
  AddingPostStage,
  addPostActions,
  selectAddingPostStage,
  selectIsAddedImages,
  selectIsDialogOpen,
} from '@/features/posts/addPost'
import { AddFilter } from '@/features/posts/addPost/ui/addFilter/AddFilter'
import { AddScropping } from '@/features/posts/addPost/ui/addScropping/AddScropping'
import { useActions, useAppSelector } from '@/shared/config/storeHooks'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Dialog } from '@/shared/ui'

export const AddingPostView = () => {
  const t = useTranslate()

  const open = useAppSelector(selectIsDialogOpen)
  const currentAddingPostStage = useAppSelector(selectAddingPostStage)
  const isAddedImages = useAppSelector(selectIsAddedImages)
  const { closeAddingPost, setAddingPostStage } = useActions(addPostActions)

  const [openConfirmClosing, setOpenConfirmClosing] = useState(false)

  const handleOpenAddingPost = (isOpen: boolean) => {
    if (isAddedImages) {
      !isOpen && setOpenConfirmClosing(true)
    } else {
      closeAddingPost()
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
    switch (currentAddingPostStage) {
      case AddingPostStage.ADD: {
        return <AddImages />
      }
      case AddingPostStage.CROPPING: {
        return <AddScropping />
      }
      case AddingPostStage.FILTERS: {
        return <AddFilter />
      }
      case AddingPostStage.DESCRIPTION: {
        return <AddDescription />
      }
    }
  }, [currentAddingPostStage])

  return (
    <>
      <Dialog
        modal
        onOpenChange={handleOpenAddingPost}
        open={open}
        title={currentAddingPostStage === AddingPostStage.ADD ? (t('Add Photo') as string) : ''}
      >
        {content}

        {openConfirmClosing && (
          <Dialog
            onOpenChange={setOpenConfirmClosing}
            open={openConfirmClosing}
            title={t('Close') as string}
          >
            <ConfirmClosingDialog
              message={
                t(
                  'Do you really want to close the creation of a publication? If you close everything will be deleted'
                ) as string
              }
              onConfirm={handleCloseAddingPost}
            />
          </Dialog>
        )}
      </Dialog>
    </>
  )
}
