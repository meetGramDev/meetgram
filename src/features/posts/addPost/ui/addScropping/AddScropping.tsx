import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'

import { ImageIconOutlined } from '@/shared/assets/icons/ImageIconOutlined'
import { useActions, useAppSelector } from '@/shared/config/storeHooks'
import { sleep } from '@/shared/lib'
import {
  Button,
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui'
import clsx from 'clsx'

import s from './AddScropping.module.scss'

import { MAX_FILES_LENGTH } from '../../const/consts'
import { addPostActions } from '../../model/slice/addPostSlice'
import { AddingPostStage } from '../../model/types/addPostTypes'
import { ImageType } from '../../model/types/slice'
import { ImageCropDialog } from '../ImageCropDialog/ImageCropDialog'
import { DialogHeader } from '../common/DialogHeader'
import { AddButton } from '../thumbsCarousel/AddButton'
import { ThumbsCarousel } from '../thumbsCarousel/ThumbsCarousel'

export const AddScropping = () => {
  const actions = useActions(addPostActions)
  const images = useAppSelector(state => state.addPost.images)
  const cropImgs = new Map()
  const isShowNavigation = images.length > 1

  const [openThumbs, setOpenThumbs] = useState(false)
  const [hideAnimation, setHideAnimation] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mainCarouselApi, setMainCarouselApi] = useState<CarouselApi>()
  const [thumbCarouselApi, setThumbCarouselApi] = useState<CarouselApi>()
  const thumbsRef = useRef<HTMLDivElement | null>(null)

  //this function for change dialog page
  const handlePrevView = () => {
    actions.setAddingPostStage(AddingPostStage.ADD)
  }
  const onNextPageView = () => {
    if (cropImgs.size !== 0) {
      cropImgs.forEach((image, id) => {
        actions.updateImage({ image: { filter: image, image: image }, index: id })
      })
    }

    actions.setAddingPostStage(AddingPostStage.FILTERS)
  }

  const handleSaveCropImg = (cropImg: string, id: number) => {
    cropImgs.set(id, cropImg)
  }

  const toggleThumbs = (open: boolean) => {
    if (open) {
      setOpenThumbs(open)
      sleep(50).then(() => {
        setHideAnimation(!open)
      })
    } else {
      setHideAnimation(!open)
      sleep(200).then(() => {
        setOpenThumbs(open)
      })
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (thumbsRef.current && !thumbsRef.current.contains(e.target as Node) && openThumbs) {
      toggleThumbs(false)
    }
  }

  const handleAddImage = (images: ImageType[]) => {
    images.forEach(imageEl => {
      actions.addImage({ filter: imageEl.filter, image: imageEl.image, orig: imageEl.orig })
    })
  }

  const handleDeleteImage = (index: number) => {
    actions.removeImage({ index })

    if (images.length === 1) {
      actions.setAddingPostStage(AddingPostStage.ADD)
    }
  }

  const handleOnThumbClick = useCallback(
    (index: number) => {
      if (!mainCarouselApi || !thumbCarouselApi) {
        return
      }

      mainCarouselApi.scrollTo(index)
    },
    [mainCarouselApi, thumbCarouselApi]
  )

  const onSelect = useCallback(() => {
    if (!mainCarouselApi || !thumbCarouselApi) {
      return
    }

    setSelectedIndex(mainCarouselApi.selectedScrollSnap())
    thumbCarouselApi.scrollTo(mainCarouselApi.selectedScrollSnap())
  }, [mainCarouselApi, thumbCarouselApi])

  useEffect(() => {
    if (!mainCarouselApi) {
      return
    }
    onSelect()

    mainCarouselApi.on('select', onSelect).on('reInit', onSelect)
  }, [mainCarouselApi, onSelect])

  return (
    <div className={s.wrapper} onMouseDown={handleClickOutside}>
      <DialogHeader header={'Cropping'} onBack={handlePrevView} onNext={onNextPageView} />

      <div className={s.carouselContainer}>
        <Carousel
          className={s.carousel}
          dotsClassname={s.dots}
          options={{ duration: 0, watchDrag: false }}
          setApi={setMainCarouselApi}
          showDotsPagination={isShowNavigation}
        >
          <CarouselContent>
            {images.map((image, index) => {
              return (
                <CarouselItem key={index}>
                  <div className={s.imageCropContainer}>
                    <ImageCropDialog
                      id={index}
                      imageUrl={image.orig}
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

        <div className={s.buttonContainer} ref={thumbsRef}>
          <div className={'relative z-[3] max-w-full p-2'}>
            {openThumbs && (
              <div
                className={clsx(s.thumbsContainer, s.defineHeight, hideAnimation && s.hideThumbs)}
              >
                <ThumbsCarousel
                  className={s.defineHeight}
                  images={images}
                  onDelete={handleDeleteImage}
                  onThumbClick={handleOnThumbClick}
                  selected={selectedIndex}
                  setApi={setThumbCarouselApi}
                />
                {images.length !== MAX_FILES_LENGTH && (
                  <div className={s.btnAddContainer}>
                    <AddButton onAdd={handleAddImage} />
                  </div>
                )}
              </div>
            )}
          </div>

          <Button
            className={clsx(s.btnThumb, openThumbs && s.btnAdd_active)}
            onClick={() => toggleThumbs(!openThumbs)}
            variant={'text'}
          >
            <ImageIconOutlined />
          </Button>
        </div>
      </div>
    </div>
  )
}
