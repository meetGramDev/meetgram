import * as SliderRadix from '@radix-ui/react-slider'
import { SliderThumb } from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './slider.module.scss'

type PropsType = {
  className: string
  max: number
  min: number
  name?: string
  onValueChange: (value: number[]) => void
  onValueCommit: (value: number[]) => void
  step: number
  value: number[]
}

export const Slider = ({
  className,
  max,
  min,
  name,
  onValueChange,
  onValueCommit,
  step,
  value,
}: PropsType) => {
  return (
    <div className={clsx(s.sliderWrapper, className)}>
      <SliderRadix.Root
        className={clsx(s.sliderRoot)}
        max={max}
        min={min}
        name={name}
        onValueChange={onValueChange}
        onValueCommit={onValueCommit}
        step={step}
        value={value}
      >
        <SliderRadix.Track className={s.sliderTrack}>
          <SliderRadix.Range className={s.sliderRange} />
        </SliderRadix.Track>
        <SliderThumb className={s.sliderThumb} />
      </SliderRadix.Root>
    </div>
  )
}
