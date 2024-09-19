import { ReactNode } from 'react'

import { Post } from '@/entities/post'

import s from './style.module.scss'

import { ImageType } from '../../model/slice/addPostSlice'

type Props = {
  children: ReactNode
  images: ImageType[]
}

export const AddDialogLayout = ({ children, images }: Props) => {
  return (
    <div className={'flex'}>
      <div className={s.post}>
        <Post alt={'post image'} src={images[0].image} />
      </div>

      {children}
    </div>
  )
}
