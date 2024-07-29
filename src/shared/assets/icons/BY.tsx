import { Ref, SVGProps, forwardRef } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'24'}
    viewBox={'0 0 32 32'}
    width={'24'}
    xmlns={'http://www.w3.org/2000/svg'}
  >
    <rect fill={'url(#pattern0_965_27)'} height={'18'} rx={'2'} width={'32'} y={'7.00003'} />
    <rect
      height={'17'}
      rx={'1.5'}
      stroke={'#252A31'}
      strokeOpacity={'0.15'}
      width={'31'}
      x={'0.5'}
      y={'7.50003'}
    />
    <defs>
      <pattern
        height={'1'}
        id={'pattern0_965_27'}
        patternContentUnits={'objectBoundingBox'}
        width={'1'}
      >
        <use transform={'scale(0.00416667 0.00740741)'} xlinkHref={'#image0_965_27'} />
      </pattern>
      <image
        height={'135'}
        id={'image0_965_27'}
        width={'240'}
        xlinkHref={
          'data:image/png;base64,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'
        }
      />
    </defs>
  </svg>
)

export const ByFlagIcon = forwardRef(SvgComponent)
