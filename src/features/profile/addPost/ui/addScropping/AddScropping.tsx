import { useState } from 'react'

import { PostView } from '@/entities/post'
import { AddingPostStage, addPostActions } from '@/features/profile/addPost'
import { ImageCropDialog } from '@/features/profile/addPost/ui/ImageCropDialog/ImageCropDialog'
import { onCrop } from '@/features/profile/addPost/ui/ImageCropDialog/cropImage'
import { DialogHeader } from '@/features/profile/addPost/ui/common/DialogHeader'
import { ArrowBack } from '@/shared/assets/icons/ArrowBack'
import { useActions, useAppDispatch, useAppSelector } from '@/shared/config/storeHooks'
import { Button } from '@/shared/ui'
import { ButtonIcon } from '@/shared/ui/buttonIcon/ButtonIcon'
import Image from 'next/image'

import s from './AddScropping.module.scss'

export const AddScropping = () => {
  const actions = useActions(addPostActions)
  const images = useAppSelector(state => state.addPost.images)
  const dispatch = useAppDispatch()
  const [cropImg, setCropImg] = useState<string | undefined>(undefined)

  //this function for change dialog page
  const handlePrevView = () => {
    actions.setAddingPostStage(AddingPostStage.ADD)
  }
  const onNextPageView = () => {
    if (cropImg) {
      //const blob = new Blob(cropImg, { type: 'image/jpeg' })

      //dispatch(addImage({ data: cropImg, image: cropImg }))
      actions.addImage({ image: cropImg })
    }

    //dispatch(setPostView(PostView.DESCRIPTION))
    actions.setAddingPostStage(AddingPostStage.FILTERS)
  }

  // console.log(cropImg)

  return (
    <div className={s.wrapper}>
      <DialogHeader header={'Cropping'} onBack={handlePrevView} onNext={onNextPageView} />
      {/*<div className={s.header}>*/}
      {/*  <ButtonIcon onClick={handlePrevView}>*/}
      {/*    /!*<Image alt={'arrow-back'} src={ArrowBack} />*!/*/}
      {/*    <ArrowBack />*/}
      {/*  </ButtonIcon>*/}
      {/*  <div>Cropping</div>*/}
      {/*  <Button onClick={onNextPageView} variant={'text'}>*/}
      {/*    Next*/}
      {/*  </Button>*/}
      {/*</div>*/}
      {images.map((image, index) => {
        return (
          <ImageCropDialog id={index} imageUrl={image.image} key={index} setCropImg={setCropImg} />
        )
      })}
      {/*{cropImg && (*/}
      {/*  <div>*/}
      {/*    <img alt={'crop image'} src={cropImg} />*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  )
}
