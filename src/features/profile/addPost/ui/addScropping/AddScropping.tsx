import { useState } from 'react'

import { AddingPostStage, addPostActions } from '@/features/profile/addPost'
import { ImageCropDialog } from '@/features/profile/addPost/ui/ImageCropDialog/ImageCropDialog'
import { DialogHeader } from '@/features/profile/addPost/ui/common/DialogHeader'
import { useActions, useAppSelector } from '@/shared/config/storeHooks'

import s from './AddScropping.module.scss'

export const AddScropping = () => {
  const actions = useActions(addPostActions)
  const images = useAppSelector(state => state.addPost.images)
  const [cropImg, setCropImg] = useState<string | undefined>(undefined)

  //this function for change dialog page
  const handlePrevView = () => {
    actions.setAddingPostStage(AddingPostStage.ADD)
  }
  const onNextPageView = () => {
    if (cropImg) {
      actions.removeImage({ index: 0 })
      actions.addImage({ image: cropImg })
    }

    actions.setAddingPostStage(AddingPostStage.FILTERS)
  }

  return (
    <div className={s.wrapper}>
      <DialogHeader header={'Cropping'} onBack={handlePrevView} onNext={onNextPageView} />
      {images.map((image, index) => {
        return (
          <ImageCropDialog id={index} imageUrl={image.image} key={index} setCropImg={setCropImg} />
        )
      })}
    </div>
  )
}
