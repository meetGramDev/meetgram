import * as React from 'react'
import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'18px'}
    ref={ref}
    width={'18px'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M16 0H2C.89 0 0 .89 0 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V2c0-1.11-.89-2-2-2ZM7 14 2 9l1.41-1.41L7 11.16l7.59-7.58L16 5l-9 9Z'
      }
      fill={'var(--dark-color-100)'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const DisabledCheckbox = memo(ForwardRef)

export default DisabledCheckbox
