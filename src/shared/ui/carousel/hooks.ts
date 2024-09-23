import { useCallback, useEffect, useState } from 'react'

import { CarouselApi, UseDotButtonType, UsePrevNextButtonsType } from './types'

const usePrevNextButtons = (carouselApi: CarouselApi): UsePrevNextButtonsType => {
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
    // setSelectedIndex(carouselApi.selectedScrollSnap())
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

export { useDotButton, usePrevNextButtons }
