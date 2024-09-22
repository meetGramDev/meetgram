import {
  ComponentProps,
  HTMLAttributes,
  KeyboardEvent,
  forwardRef,
  useCallback,
  useEffect,
} from 'react'

import { ArrowNext } from '@/shared/assets/icons/ArrowNext'
import { ArrowPrev } from '@/shared/assets/icons/ArrowPrev'
import { Dot } from '@/shared/assets/icons/Dot'
import { ButtonIcon } from '@/shared/ui/buttonIcon/ButtonIcon'
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'

import s from './Carousel.module.scss'

import { CarouselContext, useCarousel } from './context'
import { useDotButton, usePrevNextButtons } from './hooks'
import { CarouselApi, CarouselProps } from './types'

const Carousel = forwardRef<HTMLDivElement, CarouselProps & HTMLAttributes<HTMLDivElement>>(
  (
    {
      children,
      className,
      dotsClassname,
      options,
      plugins,
      setApi,
      showDotsPagination = true,
      ...restProps
    },
    ref
  ) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins)
    const { canScrollNext, canScrollPrev, scrollNext, scrollPrev } = usePrevNextButtons(emblaApi)
    const { onDotButtonClick, scrollSnaps, selectedIndex } = useDotButton(emblaApi)

    useEffect(() => {
      if (!emblaApi || !setApi) {
        return
      }

      setApi(emblaApi)
    }, [emblaApi, setApi])

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    return (
      <CarouselContext.Provider
        value={{
          canScrollNext,
          canScrollPrev,
          carouselApi: emblaApi,
          carouselRef: emblaRef,
          onDotButtonClick,
          options,
          plugins,
          scrollNext,
          scrollPrev,
          scrollSnaps,
          selectedIndex,
          setApi,
        }}
      >
        <div
          aria-roledescription={'carousel'}
          className={clsx(s.container, className)}
          onKeyDownCapture={handleKeyDown}
          ref={ref}
          role={'region'}
          {...restProps}
        >
          {children}

          {showDotsPagination && (
            <div className={clsx(s.dots, dotsClassname)}>
              {scrollSnaps.map((_, i) => (
                <DotButton index={i} key={i} onClick={() => onDotButtonClick(i)} />
              ))}
            </div>
          )}
        </div>
      </CarouselContext.Provider>
    )
  }
)

Carousel.displayName = 'Carousel'

const CarouselContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...restProps }, ref) => {
    const { carouselRef } = useCarousel()

    return (
      <div className={s.viewport} ref={carouselRef}>
        <div className={clsx(s.content, className)} ref={ref} {...restProps} />
      </div>
    )
  }
)

CarouselContent.displayName = 'CarouselContent'

const CarouselItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...restProps }, ref) => {
    return (
      <div
        aria-roledescription={'slide'}
        className={clsx(s.slide, className)}
        ref={ref}
        role={'group'}
        {...restProps}
      />
    )
  }
)

CarouselItem.displayName = 'CarouselItem'

const CarouselPrevious = forwardRef<HTMLButtonElement, ComponentProps<typeof ButtonIcon>>(
  ({ className, ...restProps }, ref) => {
    const { canScrollPrev, scrollPrev } = useCarousel()

    return (
      <ButtonIcon
        className={clsx(s.slideButton, s.slideBtnPrev, className)}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        ref={ref}
        {...restProps}
      >
        <span className={s.srOnly}>Previous slide</span>
        <ArrowPrev />
      </ButtonIcon>
    )
  }
)

CarouselPrevious.displayName = 'CarouselPrevious'

const CarouselNext = forwardRef<HTMLButtonElement, ComponentProps<typeof ButtonIcon>>(
  ({ className, ...restProps }, ref) => {
    const { canScrollNext, scrollNext } = useCarousel()

    return (
      <ButtonIcon
        className={clsx(s.slideButton, s.slideBtnNext, className)}
        disabled={!canScrollNext}
        onClick={scrollNext}
        ref={ref}
        {...restProps}
      >
        <span className={s.srOnly}>Next slide</span>
        <ArrowNext />
      </ButtonIcon>
    )
  }
)

CarouselNext.displayName = 'CarouselNext'

const DotButton = forwardRef<
  HTMLButtonElement,
  { index: number } & ComponentProps<typeof ButtonIcon>
>(({ className, index, ...restProps }, ref) => {
  const { selectedIndex } = useCarousel()

  return (
    <ButtonIcon
      className={clsx(s.dotButton, selectedIndex === index && s.selected, className)}
      ref={ref}
      {...restProps}
    >
      <span className={s.srOnly}>Select {index} slide</span>
      <Dot />
    </ButtonIcon>
  )
})

DotButton.displayName = 'DotButton'

export {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselProps,
  DotButton,
}
