import { useState } from 'react'
import Cropper from 'react-easy-crop'

import { PostViewSelect } from '@/features/posts/postViewSelect'
import { setPostView } from '@/features/profile/addPost/model/slice/addPostSlice'
import { PostView } from '@/features/profile/addPost/model/types/addPostTypes'
import { AddPostSettingsSelect } from '@/features/profile/addPost/ui/addPostSettingsSelect/AddPostSettingsSelect'
import { Expand } from '@/shared/assets/icons/Expand'
import { HorizontalRectangle } from '@/shared/assets/icons/HorizontalRectangle'
import { ImageIcon } from '@/shared/assets/icons/ImageIcon'
import { ImageIconOutlined } from '@/shared/assets/icons/ImageIconOutlined'
import { Maxinize } from '@/shared/assets/icons/Maxinize'
import { MaxinizeOutline } from '@/shared/assets/icons/MaxinizeOutline'
import { Rectangle } from '@/shared/assets/icons/Rectangle'
import { Rectangular } from '@/shared/assets/icons/Rectangular'
import ArrowBack from '@/shared/assets/icons/arrow-back.svg'
import { useAppDispatch, useAppSelector } from '@/shared/config/storeHooks'
import { Button } from '@/shared/ui'
import { ButtonIcon } from '@/shared/ui/buttonIcon/ButtonIcon'
import Image from 'next/image'

import s from './AddScropping.module.scss'

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

export const AddScropping = () => {
  const images = useAppSelector(state => state.addPost.images)
  const dispatch = useAppDispatch()

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspect, setAspect] = useState<AspectRatioType>(aspectRatios[0])
  const handlePrevView = () => {
    dispatch(setPostView(PostView.IMAGE))
  }
  const onNextPageView = () => {
    dispatch(setPostView(PostView.FILTERS))
  }

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop)
  }

  const onZoomChange = (zoom: number) => {
    setZoom(zoom)
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

      <div className={s.cropperWrapper}>
        <Cropper
          aspect={aspect?.value}
          crop={crop}
          cropShape={'rect'}
          image={images[0].image}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          zoom={zoom}
          // zoomWithScroll={false}
        />
        <div className={s.controlCropperWrapper}>
          <div className={s.buttonCroppingWrapper}>
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
            <AddPostSettingsSelect placeholder={<Maxinize />}>
              <input
                max={3}
                min={1}
                onInput={e => onZoomChange(+e.currentTarget.value)}
                step={0.1}
                type={'range'}
                value={zoom}
              />
            </AddPostSettingsSelect>
          </div>
          <AddPostSettingsSelect placeholder={<ImageIconOutlined />}> </AddPostSettingsSelect>
        </div>
      </div>
    </div>
  )
}
