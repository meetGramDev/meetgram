import * as SliderRadix from '@radix-ui/react-slider'
import { SliderThumb } from '@radix-ui/react-slider'

import s from './slider.module.scss'

type PropsType = {
  max: number
  min: number
  step: number
}

export const Slider = ({ max, min, step }: PropsType) => {
  return (
    <div className={s.sliderWrapper}>
      <SliderRadix.Root className={s.sliderRoot} max={max} min={min} step={step}>
        <SliderRadix.Track className={s.sliderTrack}>
          <SliderRadix.Range className={s.sliderRange} />
        </SliderRadix.Track>
        <SliderThumb className={s.sliderThumb} />
      </SliderRadix.Root>
    </div>
  )
}
