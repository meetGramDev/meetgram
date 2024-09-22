import * as SliderRadix from '@radix-ui/react-slider'
import { SliderThumb } from '@radix-ui/react-slider'

import s from './slider.module.scss'

type PropsType = {
  max: number
  min: number
  name?: string
  onValueChange: (value: number[]) => void
  onValueCommit: (value: number[]) => void
  step: number
}

export const Slider = ({ max, min, name, onValueChange, onValueCommit, step }: PropsType) => {
  return (
    <SliderRadix.Root
      className={s.sliderRoot}
      max={max}
      min={min}
      name={name}
      onValueChange={onValueChange}
      onValueCommit={onValueCommit}
      step={step}
    >
      <SliderRadix.Track className={s.sliderTrack}>
        <SliderRadix.Range className={s.sliderRange} />
      </SliderRadix.Track>
      <SliderThumb className={s.sliderThumb} />
    </SliderRadix.Root>
  )
}
