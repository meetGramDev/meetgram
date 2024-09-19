import { useState } from 'react'

import {
  addImage,
  clearImagesState,
  setPostView,
} from '@/features/profile/addPost/model/slice/addPostSlice'
import { PostView } from '@/features/profile/addPost/model/types/addPostTypes'
import { ImageCropDialog } from '@/features/profile/addPost/ui/ImageCropDialog/ImageCropDialog'
import { onCrop } from '@/features/profile/addPost/ui/ImageCropDialog/cropImage'
import ArrowBack from '@/shared/assets/icons/arrow-back.svg'
import { useAppDispatch, useAppSelector } from '@/shared/config/storeHooks'
import { Button } from '@/shared/ui'
import { ButtonIcon } from '@/shared/ui/buttonIcon/ButtonIcon'
import Image from 'next/image'

import s from './AddScropping.module.scss'

export const AddScropping = () => {
  const images = useAppSelector(state => state.addPost.images)
  const dispatch = useAppDispatch()
  const [cropImg, setCropImg] = useState<string | undefined>(undefined)

  //this function for change dialog page
  const handlePrevView = () => {
    dispatch(setPostView(PostView.IMAGE))
  }
  const onNextPageView = () => {
    if (cropImg) {
      //const blob = new Blob(cropImg, { type: 'image/jpeg' })
      dispatch(clearImagesState())
      dispatch(addImage({ data: cropImg, image: cropImg }))
    }

    dispatch(setPostView(PostView.DESCRIPTION))
  }

  console.log(cropImg)

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <ButtonIcon onClick={handlePrevView}>
          <Image alt={'arrow-back'} src={ArrowBack} />
        </ButtonIcon>
        <div>Cropping</div>
        <Button onClick={onNextPageView} variant={'text'}>
          Next
        </Button>
      </div>
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
