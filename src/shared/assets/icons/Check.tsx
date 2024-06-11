import * as React from 'react'
import { Ref, SVGProps, forwardRef } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={18}
    ref={ref}
    width={18}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M16 0H2C.89 0 0 .89 0 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V2c0-1.11-.89-2-2-2ZM7 14 2 9l1.4-1.41L7 11.16l7.59-7.58L16 5l-9 9Z'
      }
      fill={props.fill ? props.fill : 'var(--light-color-100)'}
    />
  </svg>
)

export const Check = forwardRef(SvgComponent)
