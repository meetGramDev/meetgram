import { ReactEventHandler, useEffect, useRef, useState } from 'react'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProps,
} from '@/shared/ui'
import clsx from 'clsx'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import s from './ImageCarousel.module.scss'

type ImageType =
  | {
      createdAt?: string
      fileSize: number
      height: number
      image: string
      uploadId: string
      width: number
    }
  | { filter: string; image: string }
  | { url: StaticImport | string }

type Props = {
  className?: string
  contentClassname?: string
  images: ImageType[]
  itemClassname?: string
  keyName?: 'filter' | 'image'
  onNext?: () => void
  onPrev?: () => void
  /**
   * Default: `True`.
   * Toggle a navigation arrow buttons view.
   */
  showNavigation?: boolean
} & CarouselProps

export const ImageCarousel = ({
  className,
  contentClassname,
  images,
  itemClassname,
  keyName,
  onCurrentSlide,
  onNext,
  onPrev,
  options,
  showNavigation = true,
  ...props
}: Props) => {
  const [api, setApi] = useState<CarouselApi>()
  const isManyItems = images.length > 1
  const imageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!api) {
      return
    }

    const preventEdgeScrolling = function (api: CarouselApi) {
      if (!api) {
        return
      }

      const { limit, location, offsetLocation, scrollBody, scrollTo, target, translate } =
        api.internalEngine()

      let edge: null | number = null

      if (limit.reachedMax(target.get())) {
        edge = limit.max
      }
      if (limit.reachedMin(target.get())) {
        edge = limit.min
      }

      if (edge !== null) {
        offsetLocation.set(edge)
        location.set(edge)
        target.set(edge)
        translate.to(edge)
        translate.toggleActive(false)
        scrollBody.useDuration(0).useFriction(0)
        scrollTo.distance(0, false)
      } else {
        translate.toggleActive(true)
      }
    }

    api.on('scroll', preventEdgeScrolling)
  }, [api])

  const handleOnImageLoad: ReactEventHandler<HTMLImageElement> = e => {
    if (e.currentTarget.naturalHeight > e.currentTarget.naturalWidth) {
      e.currentTarget.style.width = 'auto'
      e.currentTarget.style.height = '100%'
    }
  }

  return (
    <Carousel
      className={clsx(s.carousel, className)}
      dotsClassname={clsx(s.dots)}
      options={{
        ...options,
        containScroll: 'trimSnaps',
        skipSnaps: false,
        watchDrag: isManyItems,
      }}
      setApi={setApi}
      showDotsPagination={isManyItems}
      {...props}
    >
      <CarouselContent className={clsx(contentClassname)}>
        {images?.map((image, i) => {
          const imgProps = {
            height: 300,
            src: '',
            width: 300,
          }

          if (keyName === 'filter' && 'filter' in image) {
            imgProps.src = image.filter || ''
          } else if (keyName === 'image' && 'image' in image) {
            imgProps.src = image.image || ''
          } else if ('url' in image) {
            imgProps.src = typeof image.url === 'string' ? image.url : ''
          }

          return (
            <CarouselItem className={clsx(itemClassname, s.item)} key={i}>
              <div className={s.itemContainer}>
                <div className={s.picture}>
                  <Image
                    alt={`Image-${i + 1}`}
                    className={s.photo}
                    onLoad={handleOnImageLoad}
                    ref={imageRef}
                    {...imgProps}
                  />
                </div>
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>

      {showNavigation && isManyItems && (
        <>
          <CarouselPrevious className={s.navigationPrev} onPrev={onPrev} />
          <CarouselNext className={s.navigationNext} onNext={onNext} />
        </>
      )}
    </Carousel>
  )
}
