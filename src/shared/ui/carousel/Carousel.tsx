/* eslint-disable max-lines */
import {
  ComponentProps,
  HTMLAttributes,
  KeyboardEvent,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { ArrowNext } from '@/shared/assets/icons/ArrowNext'
import { ArrowPrev } from '@/shared/assets/icons/ArrowPrev'
import { Dot } from '@/shared/assets/icons/Dot'
import { ButtonIcon } from '@/shared/ui/buttonIcon/ButtonIcon'
import clsx from 'clsx'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'

import s from './Carousel.module.scss'

/* === TYPES === */
type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type UsePrevNextButtonsType = {
  canScrollNext: boolean
  canScrollPrev: boolean
  scrollNext: () => void
  scrollPrev: () => void
}
type UseDotButtonType = {
  onDotButtonClick: (index: number) => void
  scrollSnaps: number[]
  selectedIndex: number
}

type CarouselProps = {
  dotsClassname?: string
  /**
   * Customize how the carousel works.
   * Docs: @see {@link https://www.embla-carousel.com/api/options/}
   */
  options?: CarouselOptions
  /**
   * Plugins you want to use. They need to be passed in an array.
   * More: @see {@link https://www.embla-carousel.com/plugins/}
   */
  plugins?: CarouselPlugin
  /**
   * Enables to get an access to an instance of the carousel API
   * @param api carousel api object
   *
   * @example
   * ```tsx
   * const [api, setApi] = React.useState<CarouselApi>()
   *
   *   React.useEffect(() => {
   *    if (!api) {
   *      return
   *    }
   *
   *    api.on("select", () => {
   *        // Do sth on select
   *     })
   *   }, [api])
   *
   * return <Carousel setApi={setApi} ></Carousel>
   * ```
   */
  setApi?: (api: CarouselApi) => void
  showDotsPagination?: boolean
}
type CarouselContextProps = {
  carouselApi: CarouselApi
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
} & CarouselProps &
  UseDotButtonType &
  UsePrevNextButtonsType

/* === CONTEXT API === */
const CarouselContext = createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

/* === HOOKS === */
export const usePrevNextButtons = (carouselApi: CarouselApi): UsePrevNextButtonsType => {
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => {
    if (!carouselApi) {
      return
    }
    carouselApi.scrollPrev()
  }, [carouselApi])

  const scrollNext = useCallback(() => {
    if (!carouselApi) {
      return
    }
    carouselApi.scrollNext()
  }, [carouselApi])

  const onSelect = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) {
      return
    }

    setCanScrollPrev(carouselApi.canScrollPrev())
    setCanScrollNext(carouselApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!carouselApi) {
      return
    }

    onSelect(carouselApi)
    carouselApi.on('reInit', onSelect).on('select', onSelect)

    return () => {
      carouselApi?.off('select', onSelect)
    }
  }, [carouselApi, onSelect])

  return {
    canScrollNext,
    canScrollPrev,
    scrollNext,
    scrollPrev,
  }
}
/* === ==== */
const useDotButton = (carouselApi: CarouselApi): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!carouselApi) {
        return
      }

      carouselApi.scrollTo(index)
    },
    [carouselApi]
  )

  const onInit = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) {
      return
    }

    setScrollSnaps(carouselApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) {
      return
    }

    setSelectedIndex(carouselApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!carouselApi) {
      return
    }

    onInit(carouselApi)
    onSelect(carouselApi)
    carouselApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [carouselApi, onInit, onSelect])

  return {
    onDotButtonClick,
    scrollSnaps,
    selectedIndex,
  }
}

/* === COMPONENTS === */
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
  DotButton,
}
