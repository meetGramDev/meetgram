import { useState } from 'react'
import Cropper from 'react-easy-crop'

import ArrowBack from '@/shared/assets/icons/arrow-back.svg'
import { Button } from '@/shared/ui'
import { ButtonIcon } from '@/shared/ui/buttonIcon/ButtonIcon'
import Image from 'next/image'

import s from './AddScropping.module.scss'

export const AddScropping = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const handlePrevView = () => {}
  const onNextState = () => {}

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <ButtonIcon onClick={handlePrevView}>
          <Image alt={'arrow-back'} src={ArrowBack} />
        </ButtonIcon>
        <div>Cropping</div>
        <Button onClick={onNextState} variant={'text'}>
          Next
        </Button>
      </div>
      <div>{/*{<Cropper crop={crop} image={''} onCropChange={setCrop} zoom={zoom} />}*/}</div>
    </div>
  )
}
