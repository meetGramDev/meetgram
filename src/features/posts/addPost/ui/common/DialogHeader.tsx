import { useState } from 'react'

import { ArrowBack } from '@/shared/assets/icons/ArrowBack'
import { ConfirmClosingDialog } from '@/shared/components/dialog'
import { useActions, useAppSelector } from '@/shared/config/storeHooks'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Button, Dialog } from '@/shared/ui'
import { ButtonIcon } from '@/shared/ui/buttonIcon/ButtonIcon'

import s from './style.module.scss'

import {
  selectAddingPostStage,
  selectNumberOfImages,
} from '../../model/selectors/addPost.selectors'
import { addPostActions } from '../../model/slice/addPostSlice'
import { AddingPostStage } from '../../model/types/addPostTypes'

type Props = {
  header: string
  isLoading?: boolean
  nextBtnText?: string
  onBack: () => void
  onNext: () => void
}

export const DialogHeader = (props: Props) => {
  const t = useTranslate()
  const { header, isLoading, nextBtnText = t('Next'), onBack, onNext } = props

  const addingPostStage = useAppSelector(selectAddingPostStage)
  const imagesNumber = useAppSelector(selectNumberOfImages)
  const { clearEditedImages, setFilterData } = useActions(addPostActions)

  const [openConfirm, setOpenConfirm] = useState(false)

  const handleCloseAddingPost = (isConfirm: boolean) => {
    if (isConfirm) {
      clearEditedImages()
      setFilterData({ filter: '', index: 0 })
      onBack()
    } else {
      setOpenConfirm(false)
    }
  }

  const handleOnBack = () => {
    if (addingPostStage === AddingPostStage.CROPPING && imagesNumber > 0) {
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
        <Button disabled={isLoading} onClick={onNext} variant={'text'}>
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
}
