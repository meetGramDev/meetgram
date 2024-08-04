import React, { useEffect, useRef, useState } from 'react'

import { Post } from '@/entities/post'
import { clsx } from 'clsx'

import s from './PostsListMobile.module.scss'

import { List } from '../../model/types/postsList'

export const PostsListMobile = ({ images }: List) => {
  const [showGallery, setShowGallery] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const handleTouch = (index: number) => {
    setSelectedImageIndex(index)
    setShowGallery(true)
  }

  useEffect(() => {
    if (selectedImageIndex ?? itemRefs.current[selectedImageIndex]) {
      itemRefs.current[selectedImageIndex]?.scrollIntoView({ block: 'center' })
    }
  }, [selectedImageIndex])

  return (
    <div className={s.container}>
      <div className={clsx(s.postsList, showGallery && s.tape)}>
        {images.map((image, index) => (
          <div
            className={clsx(s.item, showGallery && s.tapeItem)}
            key={image.id}
            onClick={() => handleTouch(index)}
            ref={el => {
              itemRefs.current[index] = el
            }}
          >
            <Post
              alt={`${image.alt}`}
              className={s.image}
              height={image.height}
              src={image.src}
              width={image.width}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
