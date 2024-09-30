import { useRef, useState } from 'react'

import { Post } from '@/entities/post'
import { AddingPostStage, addPostActions } from '@/features/profile/addPost'
import { useActions, useAppSelector } from '@/shared/config/storeHooks'
import { ImageCarousel } from '@/shared/ui'
import { clsx } from 'clsx'

import s from './AddFilter.module.scss'

import { filterMap, filters } from '../../lib/filtersState'
import { DialogHeader } from '../common/DialogHeader'

export const AddFilter = () => {
  const actions = useActions(addPostActions)
  const images = useAppSelector(state => state.addPost.images)
  const [selectedFilter, setSelectedFilter] = useState<string>('')
  const [filtersForImages, setFiltersForImages] = useState<string[]>(Array(images.length).fill(''))
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [smallImageIndex, setSmallImageIndex] = useState<number>(0)
  const [bigImageIndex, setBigImageIndex] = useState<number>(0)
  const filteredImages = useRef(new Map())

  const selectImage = (filter: string, index: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const image = new Image()
    const currentImage = images[bigImageIndex]

    image.src = currentImage.image

    image.onload = () => {
      if (canvas && ctx) {
        canvas.width = image.width
        canvas.height = image.height

        ctx.filter = 'none'
        ctx.drawImage(image, 0, 0, image.width, image.height)

        setSelectedFilter(filter)
        setSmallImageIndex(index)
        const dataUrl = canvas.toDataURL('image/jpeg')

        filteredImages.current.set(bigImageIndex, dataUrl)
      }
    }

    const updatedFilters = [...filtersForImages]

    updatedFilters[bigImageIndex] = filter
    setFiltersForImages(updatedFilters)
  }

  const saveImageToCanvas = (imageSrc: string, filter: string, imageIndex: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const image = new Image()

    image.src = imageSrc

    image.onload = () => {
      if (canvas && ctx) {
        canvas.width = image.width
        canvas.height = image.height
        if (filter !== filter) {
          ctx.filter = 'none'
        }
        ctx.filter = filterMap[filter] || 'none'
        ctx.drawImage(image, 0, 0, image.width, image.height)

        const dataUrl = canvas.toDataURL('image/jpeg')

        filteredImages.current.set(imageIndex, dataUrl)
      }
    }
  }

  const handleNextCarousel = () => {
    if (!selectedFilter) {
      setFiltersForImages(Array(images.length).fill(''))
    }
    const nextIndex = bigImageIndex + 1

    const currentImage = images[bigImageIndex]
    const currentFilter = filtersForImages[bigImageIndex] || selectedFilter

    saveImageToCanvas(currentImage.image, currentFilter, bigImageIndex)

    setBigImageIndex(nextIndex)

    const nextFilter = filtersForImages[nextIndex]

    if (nextFilter) {
      const filterIndex = filters.indexOf(nextFilter)

      setSmallImageIndex(filterIndex)
    } else {
      setSmallImageIndex(0)
      setSelectedFilter('')
    }
  }

  const handlePrevCarousel = () => {
    if (!selectedFilter) {
      setFiltersForImages(Array(images.length).fill('none'))
    }

    const prevIndex = bigImageIndex > 0 ? bigImageIndex - 1 : images.length - 1

    const currentImage = images[bigImageIndex]
    const currentFilter = filtersForImages[bigImageIndex] || selectedFilter

    saveImageToCanvas(currentImage.image, currentFilter, bigImageIndex)

    setBigImageIndex(prevIndex)

    const prevFilter = filtersForImages[prevIndex]

    if (prevFilter && prevFilter !== 'none') {
      const filterIndex = filters.indexOf(prevFilter)

      setSmallImageIndex(filterIndex)
      setSelectedFilter(prevFilter)
    } else {
      setSmallImageIndex(0)
      setSelectedFilter('none')
    }
  }

  const handleNextView = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const image = new Image()
    const currentImage = images[bigImageIndex]

    image.src = currentImage.image

    image.onload = () => {
      if (canvas && ctx) {
        canvas.width = image.width
        canvas.height = image.height

        const currentFilter = filtersForImages[bigImageIndex] || selectedFilter

        ctx.filter = filterMap[currentFilter]
        ctx.drawImage(image, 0, 0, image.width, image.height)

        const dataUrl = canvas.toDataURL('image/jpeg')

        filteredImages.current.set(bigImageIndex, dataUrl)
        if (filteredImages.current.size !== 0) {
          filteredImages.current.forEach((image, index) => {
            actions.updateImage({ image: { filter: image }, index: index })
          })
        }
      }
    }
    actions.setAddingPostStage(AddingPostStage.DESCRIPTION)
  }

  const handlePrevStep = () => {
    actions.setAddingPostStage(AddingPostStage.CROPPING)
  }

  return (
    <div className={s.container}>
      <DialogHeader header={'Filters'} onBack={handlePrevStep} onNext={handleNextView} />
      <div className={s.content}>
        <div className={s.leftSide}>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          <ImageCarousel
            className={clsx(
              s.bigImage,
              s[`filter-${filtersForImages[bigImageIndex] || selectedFilter}`]
            )}
            images={images.map((image, index) => ({
              ...image,
              image: filteredImages.current.get(index) || image.image,
            }))}
            keyName={'image'}
            onNext={handleNextCarousel}
            onPrev={handlePrevCarousel}
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
                    smallImageIndex === indexOfFilter ? s.select : ''
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
