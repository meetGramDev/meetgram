import { FormEvent, useState } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'

import { onCrop } from '@/features/profile/addPost/ui/ImageCropDialog/cropImage'
import { AddPostSettingsSelect } from '@/features/profile/addPost/ui/addPostSettingsSelect/AddPostSettingsSelect'
import { Expand } from '@/shared/assets/icons/Expand'
import { HorizontalRectangle } from '@/shared/assets/icons/HorizontalRectangle'
import { ImageIcon } from '@/shared/assets/icons/ImageIcon'
import { Maxinize } from '@/shared/assets/icons/Maxinize'
import { MaxinizeOutline } from '@/shared/assets/icons/MaxinizeOutline'
import { Rectangle } from '@/shared/assets/icons/Rectangle'
import { Rectangular } from '@/shared/assets/icons/Rectangular'
import { Button, Slider } from '@/shared/ui'

import s from './ImageCropDialog.module.scss'

type AspectRatioType = {
  text: string
  value: number
}
type AspectRatiosType = AspectRatioType[]
const aspectRatios = [
  {
    text: '4:3',
    value: 4 / 3,
  },
  {
    text: '4:5',
    value: 4 / 5,
  },

  {
    text: '16:9',
    value: 16 / 9,
  },
  {
    text: '1:1',
    value: 1 / 1,
  },
]

export type ImageCropDialogType = {
  aspectInit?: AspectRatioType
  cropInit?: { x: number; y: number }
  id: number
  imageUrl?: string
  // setCropImg: (img: string | undefined) => void
  onCropComplete?: (img: string, id: number) => void
  zoomInit?: number[]
}

type CropType = {
  x: number
  y: number
}

export const ImageCropDialog = ({
  aspectInit,
  cropInit,
  id,
  imageUrl,
  onCropComplete,
  zoomInit,
}: ImageCropDialogType) => {
  if (zoomInit == null) {
    zoomInit = [1]
  }
  if (cropInit == null) {
    cropInit = { x: 0, y: 0 }
  }
  if (aspectInit == null) {
    aspectInit = aspectRatios[0]
  }
  const [crop, setCrop] = useState<Point>(cropInit)
  const [zoom, setZoom] = useState<number[]>(zoomInit)
  const [aspect, setAspect] = useState<AspectRatioType>(aspectInit)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropChange = (crop: CropType) => {
    setCrop(crop)
  }

  //for zoom
  const onZoomChange = (zoomCount: number[]) => {
    setZoom(zoomCount)
  }
  const onZoomCommit = (val: number[]) => {
    setZoom(val)
  }

  const onAspectChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
  }

  const handleOnCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
    if (imageUrl === undefined) {
      return
    }
    onCrop(
      croppedAreaPixels,
      imageUrl,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      cropImg => {
        onCropComplete?.(cropImg, id)
      }
    )
  }

  return (
    <div className={s.cropperWrapper}>
      <Cropper
        aspect={aspect.value}
        crop={crop}
        cropShape={'rect'}
        image={imageUrl}
        onCropChange={onCropChange}
        onCropComplete={handleOnCropComplete}
        //onZoomChange={onZoomChange}
        zoom={zoom[0]}
        zoomWithScroll={false}
      />
      <div className={s.controlCropperWrapper}>
        <div className={s.buttonCroppingWrapper}>
          <div className={s.buttonContainer}>
            <AddPostSettingsSelect placeholder={<Expand />}>
              <div className={s.menuContent}>
                <Button
                  className={s.button}
                  onClick={() => {
                    setAspect(aspectRatios[0])
                  }}
                  variant={'text'}
                >
                  <>Оригинал</>
                  <ImageIcon />{' '}
                </Button>

                <Button
                  className={s.button}
                  onClick={() => {
                    setAspect(aspectRatios[3])
                  }}
                  variant={'text'}
                >
                  <>1:1</>
                  <Rectangle />{' '}
                </Button>
                <Button
                  className={s.button}
                  onClick={() => {
                    setAspect(aspectRatios[1])
                  }}
                  variant={'text'}
                >
                  <>4:5</>
                  <Rectangular />{' '}
                </Button>
                <Button
                  className={s.button}
                  onClick={() => {
                    setAspect(aspectRatios[2])
                  }}
                  variant={'text'}
                >
                  <>16:9</>
                  <HorizontalRectangle />{' '}
                </Button>
              </div>
            </AddPostSettingsSelect>
          </div>
          <div className={s.buttonContainer}>
            <AddPostSettingsSelect
              placeholder={<MaxinizeOutline />}
              secondPlaceholder={<Maxinize />}
            >
              <div className={s.sliderWrapper}>
                <Slider
                  className={s.slider}
                  max={3}
                  min={1}
                  onValueChange={onZoomChange}
                  onValueCommit={onZoomCommit}
                  step={0.1}
                  value={zoom}
                />
              </div>
            </AddPostSettingsSelect>
          </div>
        </div>
        {/*<div className={s.buttonContainer}>*/}
        {/*  <AddPostSettingsSelect placeholder={<ImageIconOutlined />}> </AddPostSettingsSelect>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}