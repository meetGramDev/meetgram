import { Ref, SVGProps, forwardRef } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'24'}
    viewBox={'0 0 32 32'}
    width={'24'}
    xmlns={'http://www.w3.org/2000/svg'}
  >
    <rect fill={'url(#pattern0_965_23)'} height={'18'} rx={'2'} width={'32'} y={'7'} />
    <rect
      height={'17'}
      rx={'1.5'}
      stroke={'#252A31'}
      strokeOpacity={'0.15'}
      width={'31'}
      x={'0.5'}
      y={'7.5'}
    />
    <defs>
      <pattern
        height={'1'}
        id={'pattern0_965_23'}
        patternContentUnits={'objectBoundingBox'}
        width={'1'}
      >
        <use transform={'scale(0.00416667 0.00740741)'} xlinkHref={'#image0_965_23'} />
      </pattern>
      <image
        height={'135'}
        id={'image0_965_23'}
        width={'240'}
        xlinkHref={
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACHCAIAAACnEEO8AAAAAXNSR0IArs4c6QAAAqtJREFUeAHt1zENw0AUBUGfdV1gmEXAGEGQ2YxCw5WLKFForOYYvP3T3Nj2c/EUqBRYK0PsUOBfAGgOUgWATp3TGKAZSBUAOnVOY4BmIFUA6NQ5jQGagVQBoFPnNAZoBlIFgE6d0xigGUgVADp1TmOAZiBVAOjUOY0BmoFUAaBT5zQGaAZSBYBOndMYoBlIFQA6dU5jgGYgVQDo1DmNAZqBVAGgU+c0BmgGUgWATp3TGKAZSBUAOnVOY4BmIFUA6NQ5jQGagVQBoFPnNAZoBlIFgE6d0xigGUgVADp1TmOAZiBVAOjUOY0BmoFUAaBT5zQGaAZSBYBOndMYoBlIFQA6dU5jgGYgVQDo1DmNAZqBVAGgU+c0BmgGUgWATp3TGKAZSBUAOnVOY4BmIFUA6NQ5jQGagVQBoFPnNAZoBlIFgE6d0xigGUgVADp1TmOAZiBVAOjUOY0BmoFUAaBT5zRmXvdDBQUyBebreWTGGKLA+L5FUKBTYH7uzhhLFPApZCBVAOjUOY0BmoFUAaBT5zQGaAZSBYBOndMYoBlIFQA6dU5jgGYgVQDo1DmNAZqBVAGgU+c0BmgGUgWATp3TGKAZSBUAOnVOY4BmIFUA6NQ5jQGagVQBoFPnNAZoBlIFgE6d0xigGUgVADp1TmOAZiBVAOjUOY0BmoFUAaBT5zQGaAZSBYBOndMYoBlIFQA6dU5jgGYgVQDo1DmNAZqBVAGgU+c0BmgGUgWATp3TGKAZSBUAOnVOY4BmIFUA6NQ5jQGagVQBoFPnNAZoBlIFgE6d0xigGUgVADp1TmOAZiBVAOjUOY0BmoFUAaBT5zQGaAZSBYBOndMYoBlIFQA6dU5jgGYgVQDo1DmNAZqBVAGgU+c0BmgGUgWATp3TGKAZSBUAOnVOY4BmIFXgBwlFCVU01p6lAAAAAElFTkSuQmCC'
        }
      />
    </defs>
  </svg>
)

export const UaFlagIcon = forwardRef(SvgComponent)
