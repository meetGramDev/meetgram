import { Ref, SVGProps, forwardRef } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={20}
    ref={ref}
    viewBox={'0 0 26 20'}
    width={26}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <rect
      height={24}
      rx={2}
      stroke={'currentColor'}
      strokeWidth={2}
      transform={'rotate(90 25 1)'}
      width={18}
      x={25}
      y={1}
    />
  </svg>
)

export const HorizontalRectangle = forwardRef(SvgComponent)
