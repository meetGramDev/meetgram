import { ReactNode } from 'react'

import { ImageCarousel } from '@/shared/ui'

import s from './style.module.scss'

import { ImageType } from '../../model/types/slice'

type Props = {
  children: ReactNode
  images: ImageType[]
}

export const AddDialogLayout = ({ children, images }: Props) => {
  return (
    <div className={'flex'}>
      <div className={s.post}>
        <ImageCarousel images={images} />
      </div>

      {children}
    </div>
  )
}
