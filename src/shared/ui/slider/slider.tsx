import * as SliderRadix from '@radix-ui/react-slider'

export const Slider = () => {
  return (
    <div className={'slider'}>
      <SliderRadix.Root>
        <SliderRadix.Track>
          <SliderRadix.Range />
        </SliderRadix.Track>
      </SliderRadix.Root>
    </div>
  )
}
