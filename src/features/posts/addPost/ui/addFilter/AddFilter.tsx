import { useRef, useState } from 'react'

import { Post } from '@/entities/post'
import { AddingPostStage, addPostActions } from '@/features/posts/addPost'
import { useActions, useAppSelector } from '@/shared/config/storeHooks'
import { useTranslate } from '@/shared/lib/useTranslate'
import { ImageCarousel } from '@/shared/ui'
import { clsx } from 'clsx'

import s from './AddFilter.module.scss'

import { filterMap, filters } from '../../lib/filtersState'
import { DialogHeader } from '../common/DialogHeader'

export const AddFilter = () => {
  const actions = useActions(addPostActions)
  const { filter, images, index } = useAppSelector(state => state.addPost)
  const [filtersForImages, setFiltersForImages] = useState<string[]>(Array(images.length).fill(''))
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [bigImageIndex, setBigImageIndex] = useState<number>(0)

  const t = useTranslate()

  const selectImage = (filter: string, index: number) => {
    actions.setFilterData({ filter, index })
    const updatedFilters = [...filtersForImages]

    updatedFilters[bigImageIndex] = filter
    setFiltersForImages(updatedFilters)
  }

  const handleNextView = () => {
    images.map((el, elIndx) => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      const image = new Image()

      image.src = el.image

      image.onload = () => {
        if (canvas && ctx) {
          canvas.width = image.width
          canvas.height = image.height
          ctx.filter = filterMap[filtersForImages[elIndx]] || 'none'
          ctx.drawImage(image, 0, 0, image.width, image.height)

          const dataUrl = canvas.toDataURL('image/jpeg')

          actions.updateImage({ image: { filter: dataUrl }, index: elIndx })
        }
      }
    })

    actions.setAddingPostStage(AddingPostStage.DESCRIPTION)
  }

  const handleNextCarousel = () => {
    const nextIndex = bigImageIndex + 1

    setBigImageIndex(nextIndex)

    const nextFilter = filtersForImages[nextIndex]

    if (nextFilter) {
      const filterIndex = filters.indexOf(nextFilter)

      actions.setFilterData({ index: filterIndex })
    } else {
      actions.setFilterData({ filter: '', index: 0 })
    }
  }

  const handlePrevCarousel = () => {
    const prevIndex = bigImageIndex > 0 ? bigImageIndex - 1 : images.length - 1

    setBigImageIndex(prevIndex)

    const prevFilter = filtersForImages[prevIndex]

    if (prevFilter && prevFilter !== 'none') {
      const filterIndex = filters.indexOf(prevFilter)

      actions.setFilterData({ filter: prevFilter, index: filterIndex })
    } else {
      actions.setFilterData({ filter: 'none', index: 0 })
    }
  }

  const handlePrevStep = () => {
    actions.setFilterData({ filter: '', index: 0 })
    actions.setAddingPostStage(AddingPostStage.CROPPING)
  }

  return (
    <div className={s.container}>
      <DialogHeader header={t('Filters')} onBack={handlePrevStep} onNext={handleNextView} />
      <div className={s.content}>
        <div className={s.leftSide}>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          <ImageCarousel
            className={clsx(s.bigImage, s[`filter-${filtersForImages[bigImageIndex] || filter}`])}
            images={images.map((image, index) => ({
              ...image,
              image: image.image,
            }))}
            keyName={'image'}
            onNext={handleNextCarousel}
            onPrev={handlePrevCarousel}
            options={{ watchDrag: false }}
            showDotsPagination={false}
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
                    index === indexOfFilter ? s.select : ''
                  )}
                  height={108}
                  src={images[bigImageIndex]?.image}
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
