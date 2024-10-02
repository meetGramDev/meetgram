import { useEffect, useRef, useState } from 'react'

import { Post } from '@/entities/post'
import { ImageCarousel } from '@/shared/ui'
import { clsx } from 'clsx'

import s from './PostsListMobile.module.scss'

import { PostListProps } from '../props.type'

export const PostsListMobile = ({ isFollowing, posts, userId }: PostListProps) => {
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
        {posts?.map((post, index) => (
          <div
            className={clsx(s.item, showGallery && s.tapeItem)}
            key={post.id}
            onClick={() => handleTouch(index)}
            ref={el => {
              itemRefs.current[index] = el
            }}
          >
            {!showGallery ? (
              <Post
                alt={'post'}
                className={s.image}
                height={post.images[0].height}
                isGallery={post.images.length > 1}
                src={post.images[0].url}
                width={post.images[0].width}
              />
            ) : (
              <ImageCarousel images={post.images} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
