import { AddingPostStage, addPostActions } from '@/features/profile/addPost'
import { ImageCropDialog } from '@/features/profile/addPost/ui/ImageCropDialog/ImageCropDialog'
import { DialogHeader } from '@/features/profile/addPost/ui/common/DialogHeader'
import { useActions, useAppSelector } from '@/shared/config/storeHooks'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui'

import s from './AddScropping.module.scss'

export const AddScropping = () => {
  const actions = useActions(addPostActions)
  const images = useAppSelector(state => state.addPost.images)
  const cropImgs = new Map()
  const isShowNavigation = images.length > 1

  //this function for change dialog page
  const handlePrevView = () => {
    actions.setAddingPostStage(AddingPostStage.ADD)
  }
  const onNextPageView = () => {
    if (cropImgs.size !== 0) {
      cropImgs.forEach((image, id) => {
        actions.updateImage({ image: { image }, index: id })
      })
    }

    actions.setAddingPostStage(AddingPostStage.FILTERS)
  }

  const handleSaveCropImg = (cropImg: string, id: number) => {
    cropImgs.set(id, cropImg)
  }

  return (
    <div className={s.wrapper}>
      <DialogHeader header={'Cropping'} onBack={handlePrevView} onNext={onNextPageView} />

      <div className={s.carouselContainer}>
        <Carousel
          className={s.carousel}
          dotsClassname={s.dots}
          options={{ duration: 0, watchDrag: false }}
          showDotsPagination={isShowNavigation}
        >
          <CarouselContent>
            {images.map((image, index) => {
              return (
                <CarouselItem key={index}>
                  <div className={s.imageCropContainer}>
                    <ImageCropDialog
                      id={index}
                      imageUrl={image.image}
                      onCropComplete={handleSaveCropImg}
                    />
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>

          {isShowNavigation && (
            <>
              <CarouselPrevious className={s.navigationPrev} />
              <CarouselNext className={s.navigationNext} />
            </>
          )}
        </Carousel>
      </div>
    </div>
  )
}
