import React from 'react'

type SvgComponentProps = {
  className?: string
} & React.SVGProps<SVGSVGElement>

const SvgComponent = (
  { className, fill, ...props }: SvgComponentProps,
  ref: React.Ref<SVGSVGElement>
) => (
  <svg
    fill={'currentColor'}
    height={'24.000000'}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={'24.000000'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
    className={className}
  >
    <path
      d={
        'M6.08 21.06C5.82 21.06 5.57 20.95 5.38 20.76C5.19 20.57 5.08 20.32 5.08 20.06L4.93 5.4C4.92 5.1 4.97 4.8 5.07 4.52C5.18 4.24 5.33 3.98 5.54 3.77C5.74 3.55 5.98 3.37 6.25 3.25C6.52 3.12 6.82 3.06 7.12 3.05L16.7 3C17 3 17.3 3.06 17.57 3.18C17.84 3.3 18.09 3.47 18.3 3.69C18.51 3.9 18.67 4.16 18.78 4.43C18.89 4.71 18.94 5.01 18.93 5.31L19.08 19.96C19.08 20.14 19.03 20.31 18.95 20.47C18.86 20.62 18.74 20.75 18.59 20.84C18.43 20.92 18.26 20.97 18.09 20.97C17.91 20.97 17.74 20.92 17.59 20.84L11.89 17.68L6.59 20.91C6.44 20.99 6.26 21.04 6.08 21.06ZM11.85 15.51C12.02 15.51 12.19 15.55 12.35 15.63L17.05 18.24L16.93 5.29C16.93 5.08 16.8 4.94 16.73 4.95L7.13 5.05C7.04 5.05 6.93 5.18 6.93 5.38L7.05 18.28L11.34 15.65C11.49 15.56 11.67 15.51 11.85 15.51Z'
      }
    />
  </svg>
)

export const FavoritesIcon = React.forwardRef(SvgComponent)
