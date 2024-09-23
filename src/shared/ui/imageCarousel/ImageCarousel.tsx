import { useEffect, useState } from 'react'

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
      uploadId: string
      url: StaticImport | string
      width: number
    }
  | { image: string }

type Props = {
  className?: string
  contentClassname?: string
  images: ImageType[]
  itemClassname?: string
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
  options,
  showNavigation = true,
  ...props
}: Props) => {
  const [api, setApi] = useState<CarouselApi>()

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

  return (
    <Carousel
      className={clsx(s.carousel, className)}
      dotsClassname={clsx(s.dots, images.length === 1 && s.invisible)}
      options={{
        ...options,
        containScroll: 'trimSnaps',
        skipSnaps: false,
        watchDrag: images.length > 1,
      }}
      setApi={setApi}
      {...props}
    >
      <CarouselContent className={clsx(contentClassname)}>
        {images?.map((image, i) => (
          <CarouselItem className={clsx(itemClassname, s.item)} key={i}>
            <Image
              alt={`Image-${i + 1}`}
              className={s.photo}
              {...('image' in image
                ? { height: 300, src: image.image, width: 300 }
                : { height: image.height, src: image.url, width: image.width })}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {showNavigation && images.length > 1 && (
        <>
          <CarouselPrevious className={s.navigationPrev} />
          <CarouselNext className={s.navigationNext} />
        </>
      )}
    </Carousel>
  )
}
