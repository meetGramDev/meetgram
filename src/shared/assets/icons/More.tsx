import { Ref, SVGProps, forwardRef } from 'react'

const SvgComponent = ({ fill, ...props }: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'currentColor'}
    height={'24'}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={'24'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <desc>Created with Pixso.</desc>
    <defs>
      <clipPath id={'clip301_4286'}>
        <rect
          fill={'white'}
          fillOpacity={'0'}
          height={'24.000000'}
          id={'more-horizontal-outline'}
          width={'24.000000'}
        />
      </clipPath>
    </defs>
    <rect
      fill={'#FFFFFF'}
      fillOpacity={'0'}
      height={'24.000000'}
      id={'more-horizontal-outline'}
      width={'24.000000'}
    />
    <g clipPath={'url(#clip301_4286)'}>
      <g opacity={'0.000000'}>
        <path
          d={'M0 0L24 0L24 24L0 24L0 0Z'}
          fill={'#000000'}
          fillOpacity={'1.000000'}
          fillRule={'evenodd'}
          id={'Vector'}
        />
      </g>
      <path
        d={
          'M14 12C14 13.1 13.1 14 12 14C10.89 14 10 13.1 10 12C10 10.89 10.89 10 12 10C13.1 10 14 10.89 14 12Z'
        }
        fill={'currentColor'}
        fillOpacity={'1.000000'}
        fillRule={'evenodd'}
        id={'Vector'}
      />
      <path
        d={
          'M21 12C21 13.1 20.1 14 19 14C17.89 14 17 13.1 17 12C17 10.89 17.89 10 19 10C20.1 10 21 10.89 21 12Z'
        }
        fill={'currentColor'}
        fillOpacity={'1.000000'}
        fillRule={'evenodd'}
        id={'Vector'}
      />
      <path
        d={'M7 12C7 13.1 6.1 14 5 14C3.89 14 3 13.1 3 12C3 10.89 3.89 10 5 10C6.1 10 7 10.89 7 12Z'}
        fill={'currentColor'}
        fillOpacity={'1.000000'}
        fillRule={'evenodd'}
        id={'Vector'}
      />
    </g>
  </svg>
)

export const MoreIcon = forwardRef(SvgComponent)
