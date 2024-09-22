import {
  Carousel,
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

type ImageType = {
  createdAt?: string
  fileSize: number
  height: number
  uploadId: string
  url: StaticImport | string
  width: number
}

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
  showNavigation = true,
  ...props
}: Props) => {
  return (
    <Carousel className={clsx(s.carousel, className)} dotsClassname={s.dots} {...props}>
      <CarouselContent className={clsx(contentClassname)}>
        {images?.map((image, i) => (
          <CarouselItem className={clsx(itemClassname, s.item)} key={i}>
            <Image
              alt={`Image-${i + 1}`}
              className={s.photo}
              height={200}
              src={image.url}
              width={200}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {showNavigation && (
        <>
          <CarouselPrevious className={s.navigationPrev} />
          <CarouselNext className={s.navigationNext} />
        </>
      )}
    </Carousel>
  )
}
