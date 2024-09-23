import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'

export type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

export type UsePrevNextButtonsType = {
  canScrollNext: boolean
  canScrollPrev: boolean
  scrollNext: () => void
  scrollPrev: () => void
}
export type UseDotButtonType = {
  onDotButtonClick: (index: number) => void
  scrollSnaps: number[]
  selectedIndex: number
}

export type CarouselProps = {
  dotsClassname?: string
  /**
   * Pass current slide index in args
   */
  onCurrentSlide?: (currentIndex: number) => void
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

export type CarouselContextProps = {
  carouselApi: CarouselApi
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
} & CarouselProps &
  UseDotButtonType &
  UsePrevNextButtonsType
