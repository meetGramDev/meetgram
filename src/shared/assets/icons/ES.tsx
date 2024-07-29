import { Ref, SVGProps, forwardRef } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'24'}
    viewBox={'0 0 32 32'}
    width={'24'}
    xmlns={'http://www.w3.org/2000/svg'}
  >
    <rect fill={'url(#pattern0_964_19)'} height={'18'} rx={'2'} width={'32'} y={'6.99997'} />
    <rect
      height={'17'}
      rx={'1.5'}
      stroke={'#252A31'}
      strokeOpacity={'0.15'}
      width={'31'}
      x={'0.5'}
      y={'7.49997'}
    />
    <defs>
      <pattern
        height={'1'}
        id={'pattern0_964_19'}
        patternContentUnits={'objectBoundingBox'}
        width={'1'}
      >
        <use transform={'scale(0.00416667 0.00740741)'} xlinkHref={'#image0_964_19'} />
      </pattern>
      <image
        height={'135'}
        id={'image0_964_19'}
        width={'240'}
        xlinkHref={
          'data:image/png;base64,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'
        }
      />
    </defs>
  </svg>
)

export const EsFlagIcon = forwardRef(SvgComponent)
