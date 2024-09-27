import { useRef, useState } from 'react'

import { Post } from '@/entities/post'
import { AddingPostStage, addPostActions } from '@/features/profile/addPost'
import { DialogHeader } from '@/features/profile/addPost/ui/common/DialogHeader'
import { useActions, useAppSelector } from '@/shared/config/storeHooks'
import { clsx } from 'clsx'

import s from './AddFilter.module.scss'

import { filterMap, filters } from '../../lib/filtersState'

export const AddFilter = () => {
  const actions = useActions(addPostActions)
  const images = useAppSelector(state => state.addPost.images)
  const [selectedFilter, setSelectedFilter] = useState('')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const selectImage = (filter: string, index: number) => {
    setSelectedFilter(filter)
    setSelectedImageIndex(index)
  }

  const handleNextView = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const image = new Image()

    image.src = images[0].image

    image.onload = () => {
      if (canvas && ctx) {
        canvas.width = image.width
        canvas.height = image.height

        ctx.filter = filterMap[selectedFilter]
        ctx.drawImage(image, 0, 0, image.width, image.height)

        const dataUrl = canvas.toDataURL('image/jpeg')

        actions.addImage({
          image: dataUrl,
        })
      }
    }
    actions.removeImage({ index: 0 })
    actions.setAddingPostStage(AddingPostStage.DESCRIPTION)
  }

  const handlePreview = () => {
    actions.setAddingPostStage(AddingPostStage.CROPPING)
  }

  return (
    <div className={s.container}>
      <DialogHeader header={'Filters'} onBack={handlePreview} onNext={handleNextView} />
      <div className={s.content}>
        <div className={s.leftSide}>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          <Post
            alt={'post image'}
            className={clsx(s.bigImage, s[`filter-${selectedFilter}`])}
            height={500}
            src={images[0].image}
            width={490}
          />
        </div>
        <div className={s.rightSideContainer}>
          <div className={s.rightSide}>
            {filters.map((filter, indexOfFilter) => (
              <div
                className={s.smallImages}
                key={indexOfFilter}
                onClick={() => selectImage(filter, indexOfFilter)}
              >
                <Post
                  alt={'small image'}
                  className={clsx(
                    s.smallImage,
                    s[`filter-${filter}`],
                    selectedImageIndex === indexOfFilter ? s.select : ''
                  )}
                  height={108}
                  src={images[0].image}
                  width={108}
                />
                <span className={s.filterName}>{filter}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
