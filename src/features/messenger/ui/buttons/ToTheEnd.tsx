import { ArrowDown } from '@/shared/assets/icons/ArrowDown'

export const ToTheEnd = () => {
  return (
    <span
      className={
        'flex aspect-square h-9 items-center justify-center text-light-100 group-active:text-light-700'
      }
    >
      <ArrowDown height={30} viewBox={'0 0 24 24'} width={30} />
    </span>
  )
}
