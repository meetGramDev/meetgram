import { CSSProperties } from 'react'

import { CloseIcon } from '@/shared/assets/icons/CloseIcon'
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProps,
} from '@/shared/ui'
import clsx from 'clsx'

import s from './ThumbsCarousel.module.scss'

import { ImageType } from '../../model/types/slice'

type Props = {
  className?: string
  images: ImageType[]
  onDelete?: (id: number) => void
  onThumbClick?: (index: number) => void
  selected?: number
} & CarouselProps

const SLIDES_TO_SCROLL = 3

export const ThumbsCarousel = ({
  className,
  images,
  onDelete,
  onThumbClick,
  options,
  selected,
  ...restProps
}: Props) => {
  const isShowNavigation = images.length > SLIDES_TO_SCROLL

  const slideSize =
    // eslint-disable-next-line no-nested-ternary
    images.length === 1 ? '100%' : images.length < SLIDES_TO_SCROLL ? '50%' : '33.333333%'

  return (
    <Carousel
      className={clsx(s.carousel, className)}
      {...restProps}
      options={{
        ...options,
        align: 'center',
        containScroll: 'keepSnaps',
        dragFree: false,
        skipSnaps: false,
        slidesToScroll: SLIDES_TO_SCROLL,
        watchDrag: false,
      }}
      showDotsPagination={false}
      style={
        {
          '--slide-size': slideSize,
        } as CSSProperties
      }
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem className={s.slide} key={index} role={'button'}>
            <div className={clsx(s.imageContainer)} onClick={() => onThumbClick?.(index)}>
              <div className={s.btnCloseContainer}>
                <Button className={s.btnClose} onClick={() => onDelete?.(index)} variant={'text'}>
                  <CloseIcon />
                </Button>
              </div>
              <div
                className={s.thumb}
                style={{
                  backgroundImage:
                    selected !== index
                      ? `linear-gradient(rgb(0 0 0 / 50%), rgb(0 0 0 / 50%)), url(${image.orig})`
                      : `linear-gradient(rgb(0 0 0 / 0%), rgb(0 0 0 / 0%)), url(${image.orig})`,
                }}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {isShowNavigation && (
        <>
          <CarouselPrevious className={s.navigationPrev} />
          <CarouselNext className={s.navigationNext} />
        </>
      )}
    </Carousel>
  )
}
