import { Ref, SVGProps, forwardRef } from 'react'
type SVGComponentProps = { className?: string } & React.SVGProps<SVGSVGElement>
const SvgComponent = (
  { className, fill = 'white', ...props }: SVGComponentProps,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    fill={'currentColor'}
    height={24}
    ref={ref}
    viewBox={'0 0 21 24'}
    width={21}
    xmlns={'http://www.w3.org/2000/svg'}
    xmlnsXlink={'http://www.w3.org/1999/xlink'}
    {...props}
  >
    <desc>{'\r\n\t\t\tCreated with Pixso.\r\n\t'}</desc>
    <defs>
      <filter
        colorInterpolationFilters={'sRGB'}
        filterUnits={'userSpaceOnUse'}
        height={0}
        id={'filter_301_4090_dd'}
        width={0}
        x={424}
        y={-293}
      >
        <feFlood floodOpacity={0} result={'BackgroundImageFix'} />
        <feColorMatrix
          in={'SourceAlpha'}
          result={'hardAlpha'}
          type={'matrix'}
          values={'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'}
        />
        <feOffset dx={0} dy={4} />
        <feGaussianBlur stdDeviation={1.33333} />
        <feComposite in2={'hardAlpha'} k2={-1} k3={1} operator={'out'} />
        <feColorMatrix type={'matrix'} values={'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'} />
        <feBlend in2={'BackgroundImageFix'} mode={'normal'} result={'effect_dropShadow_1'} />
        <feBlend
          in={'SourceGraphic'}
          in2={'effect_dropShadow_1'}
          mode={'normal'}
          result={'shape'}
        />
      </filter>
      <clipPath id={'clip301_4087'}>
        <rect fill={'currentColor'} fillOpacity={0} height={24} id={'image-outline'} width={21} />
      </clipPath>
    </defs>
    <rect fill={'currentColor'} fillOpacity={0} height={24} id={'image-outline'} width={21} />
    <g clipPath={'url(#clip301_4087)'}>
      <g filter={'url(#filter_301_4090_dd)'} opacity={0}>
        <path
          d={'M0 0L24 0L24 24L0 24L0 0Z'}
          fill={'currentColor'}
          fillOpacity={1}
          fillRule={'evenodd'}
          id={'Vector'}
        />
        <path
          d={'M24 0L24 24L0 24L0 0L24 0Z'}
          id={'Vector'}
          stroke={'#FFFFFF'}
          strokeOpacity={1}
          strokeWidth={1}
        />
      </g>
      <path
        d={
          'M18 3L6 3C5.2 3 4.44 3.31 3.87 3.87C3.31 4.44 3 5.2 3 6L3 18C3 18.79 3.31 19.55 3.87 20.12C4.44 20.68 5.2 21 6 21L18 21C18.79 21 19.55 20.68 20.12 20.12C20.68 19.55 21 18.79 21 18L21 6C21 5.2 20.68 4.44 20.12 3.87C19.55 3.31 18.79 3 18 3ZM6 5L18 5C18.26 5 18.51 5.1 18.7 5.29C18.89 5.48 19 5.73 19 6L19 14.36L15.8 11.63C15.3 11.22 14.68 10.99 14.04 10.99C13.39 10.99 12.77 11.22 12.28 11.63L5 17.7L5 6C5 5.73 5.1 5.48 5.29 5.29C5.48 5.1 5.73 5 6 5ZM18 19L6.56 19L13.56 13.16C13.69 13.06 13.85 13 14.02 13C14.19 13 14.35 13.06 14.49 13.16L19 17L19 18C19 18.26 18.89 18.51 18.7 18.7C18.51 18.89 18.26 19 18 19Z'
        }
        fill={'currentColor'}
        fillOpacity={1}
        fillRule={'nonzero'}
        id={'Vector'}
      />
      <path
        d={
          'M9.5 8.5C9.5 9.32 8.82 10 8 10C7.17 10 6.5 9.32 6.5 8.5C6.5 7.67 7.17 7 8 7C8.82 7 9.5 7.67 9.5 8.5Z'
        }
        fill={'currentColor'}
        fillOpacity={1}
        fillRule={'evenodd'}
        id={'Vector'}
      />
    </g>
  </svg>
)

export const ImageIcon = forwardRef(SvgComponent)
