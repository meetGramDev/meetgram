import { useState } from 'react'
import Cropper from 'react-easy-crop'

import { PostViewSelect } from '@/features/posts/postViewSelect'
import { setPostView } from '@/features/profile/addPost/model/slice/addPostSlice'
import { PostView } from '@/features/profile/addPost/model/types/addPostTypes'
import { AddPostSettingsSelect } from '@/features/profile/addPost/ui/addPostSettingsSelect/AddPostSettingsSelect'
import { Expand } from '@/shared/assets/icons/Expand'
import { ImageIcon } from '@/shared/assets/icons/ImageIcon'
import { ImageIconOutlined } from '@/shared/assets/icons/ImageIconOutlined'
import { Maxinize } from '@/shared/assets/icons/Maxinize'
import { MaxinizeOutline } from '@/shared/assets/icons/MaxinizeOutline'
import ArrowBack from '@/shared/assets/icons/arrow-back.svg'
import { useAppDispatch, useAppSelector } from '@/shared/config/storeHooks'
import { Button } from '@/shared/ui'
import { ButtonIcon } from '@/shared/ui/buttonIcon/ButtonIcon'
import Image from 'next/image'

import s from './AddScropping.module.scss'

export const AddScropping = () => {
  const images = useAppSelector(state => state.addPost.images)
  const dispatch = useAppDispatch()
  const [crop, setCrop] = useState({ x: 1, y: 1 })
  const [zoom, setZoom] = useState(1)
  const handlePrevView = () => {
    dispatch(setPostView(PostView.IMAGE))
  }
  const onNextPageView = () => {
    dispatch(setPostView(PostView.FILTERS))
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
          aspect={4 / 3}
          crop={crop}
          cropShape={'rect'}
          image={images[0].image}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          zoom={zoom}
          // zoomWithScroll={false}
        />
        <div className={s.buttonWrapper}>
          {/*<PostViewSelect isFollowing={} onOpenPost={} ownerId={} userId={} />*/}
          <AddPostSettingsSelect placeholder={<Expand />} />
          <ButtonIcon onClick={() => {}} style={{ padding: '6px' }}>
            {<Maxinize />}
          </ButtonIcon>
          <ButtonIcon onClick={() => {}} style={{ padding: '6px' }}>
            {<ImageIconOutlined />}
          </ButtonIcon>
        </div>
      </div>
    </div>
  )
}
