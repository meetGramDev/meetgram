import { Ref, SVGProps, forwardRef } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'24'}
    viewBox={'0 0 32 32'}
    width={'24'}
    xmlns={'http://www.w3.org/2000/svg'}
  >
    <rect fill={'url(#pattern0_964_21)'} height={'18'} rx={'2'} width={'32'} y={'6.99997'} />
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
        id={'pattern0_964_21'}
        patternContentUnits={'objectBoundingBox'}
        width={'1'}
      >
        <use transform={'scale(0.00416667 0.00740741)'} xlinkHref={'#image0_964_21'} />
      </pattern>
      <image
        height={'135'}
        id={'image0_964_21'}
        width={'240'}
        xlinkHref={
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACHCAIAAACnEEO8AAAAAXNSR0IArs4c6QAAAuxJREFUeAHt3bFNI2EYRdHfaDIaICcl3o6pBnKqgJyA9S5t3HdGbuDd72gkO/Htfr8fjwKVAg+VIXYo8FsAaA5SBYBOndMYoBlIFQA6dU5jgGYgVQDo1DmNAZqBVAGgU+c0BmgGUgWATp3TGKAZSBUAOnVOY4BmIFUA6NQ5jQGagVQBoFPnNAZoBlIFgE6d0xigGUgVADp1TmOAZiBVAOjUOY0BmoFUAaBT5zQGaAZSBYBOndMYoBlIFQA6dU5jgGYgVQDo1DmNAZqBVAGgU+c0BmgGUgWATp3TGKAZSBUAOnVOY4BmIFUA6NQ5jQGagVQBoFPnNAZoBlIFgE6d05jr7eNLBQUyBW7nz2tmjCEKXOfhpoICmQLX4TlzTEPO8aWQglQBoFPnNAZoBlIFgE6d0xigGUgVADp1TmOAZiBVAOjUOY0BmoFUAaBT5zQGaAZSBYBOndMYoBlIFQA6dU5jgGYgVQDo1DmNAZqBVAGgU+c0BmgGUgWATp3TGKAZSBUAOnVOY4BmIFUA6NQ5jQGagVQBoFPnNAZoBlIFgE6d0xigGUgVADp1TmOAZiBVAOjUOY0BmoFUAaBT5zQGaAZSBYBOndMYoBlIFQA6dU5jgGYgVQDo1DmNuc75//EoEClwPf39jEwxQ4Fzbu8vzzookClwPd6/M2MMUeD68XffFIQK+JUjdExTjtczBK0C3tCte86vAXqeQCsA0K17zq8Bep5AKwDQrXvOrwF6nkArANCte86vAXqeQCsA0K17zq8Bep5AKwDQrXvOrwF6nkArANCte86vAXqeQCsA0K17zq8Bep5AKwDQrXvOrwF6nkArANCte86vAXqeQCsA0K17zq8Bep5AKwDQrXvOrwF6nkArANCte86vAXqeQCsA0K17zq8Bep5AKwDQrXvOrwF6nkArANCte86vAXqeQCsA0K17zq8Bep5AKwDQrXvOrwF6nkArANCte86vAXqeQCsA0K17zq8Bep5AK8A/XIoNqopqSIUAAAAASUVORK5CYII='
        }
      />
    </defs>
  </svg>
)

export const RuFlagIcon = forwardRef(SvgComponent)
