import { ArrowDown } from '@/shared/assets/icons/ArrowDown'

import { FloatButton, FloatButtonProps } from './FloatButton'

export const ToTheEnd = ({ className, ...rest }: FloatButtonProps) => {
  return (
    <FloatButton className={className} {...rest}>
      <span
        className={
          'flex aspect-square h-9 items-center justify-center text-light-100 group-active:text-light-700'
        }
      >
        <ArrowDown height={30} viewBox={'0 0 24 24'} width={30} />
      </span>
    </FloatButton>
  )
}
