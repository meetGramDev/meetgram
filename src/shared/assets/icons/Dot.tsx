import { Ref, SVGProps, forwardRef } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'8'}
    ref={ref}
    viewBox={'0 0 8 8'}
    width={'8'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <circle cx={'4'} cy={'4'} fill={'currentColor'} r={'4'} />
  </svg>
)

export const Dot = forwardRef(SvgComponent)
