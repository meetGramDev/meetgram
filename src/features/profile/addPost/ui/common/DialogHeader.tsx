import { memo, useState } from 'react'

import { ConfirmClosingDialog } from '@/features/dialog/confirmClosing'
import { ArrowBack } from '@/shared/assets/icons/ArrowBack'
import { useActions, useAppSelector } from '@/shared/config/storeHooks'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Button, Dialog } from '@/shared/ui'
import { ButtonIcon } from '@/shared/ui/buttonIcon/ButtonIcon'

import s from './style.module.scss'

import { selectAddingPostStage } from '../../model/selectors/addPost.selectors'
import { addPostActions } from '../../model/slice/addPostSlice'
import { AddingPostStage } from '../../model/types/addPostTypes'

type Props = {
  header: string
  nextBtnText?: string
  onBack: () => void
  onNext: () => void
}

export const DialogHeader = memo((props: Props) => {
  const t = useTranslate()
  const { header, nextBtnText = t('Next'), onBack, onNext } = props

  const addingPostStage = useAppSelector(selectAddingPostStage)
  const { clearEditedImages } = useActions(addPostActions)

  const [openConfirm, setOpenConfirm] = useState(false)

  const handleCloseAddingPost = (isConfirm: boolean) => {
    if (isConfirm) {
      clearEditedImages()
      onBack()
    } else {
      setOpenConfirm(false)
    }
  }

  const handleOnBack = () => {
    if (addingPostStage === AddingPostStage.CROPPING) {
      setOpenConfirm(true)
    } else {
      onBack?.()
    }
  }

  return (
    <>
      <div className={s.header}>
        <ButtonIcon className={s.backArrow} onClick={handleOnBack}>
          <ArrowBack />
        </ButtonIcon>
        <div>{header}</div>
        <Button onClick={onNext} variant={'text'}>
          {nextBtnText as string}
        </Button>
      </div>

      {openConfirm && (
        <Dialog onOpenChange={setOpenConfirm} open={openConfirm} title={t('Close') as string}>
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
    </>
  )
})
