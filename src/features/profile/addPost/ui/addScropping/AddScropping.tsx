import { setPostView } from '@/features/profile/addPost/model/slice/addPostSlice'
import { PostView } from '@/features/profile/addPost/model/types/addPostTypes'
import { ImageCropDialog } from '@/features/profile/addPost/ui/ImageCropDialog/ImageCropDialog'
import ArrowBack from '@/shared/assets/icons/arrow-back.svg'
import { useAppDispatch, useAppSelector } from '@/shared/config/storeHooks'
import { Button } from '@/shared/ui'
import { ButtonIcon } from '@/shared/ui/buttonIcon/ButtonIcon'
import Image from 'next/image'

import s from './AddScropping.module.scss'

export const AddScropping = () => {
  const images = useAppSelector(state => state.addPost.images)
  const dispatch = useAppDispatch()

  //this function for change dialog page
  const handlePrevView = () => {
    dispatch(setPostView(PostView.IMAGE))
  }
  const onNextPageView = () => {
    dispatch(setPostView(PostView.DESCRIPTION))
  }

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
        return <ImageCropDialog id={index} imageUrl={image.image} key={index} />
      })}
    </div>
  )
}
