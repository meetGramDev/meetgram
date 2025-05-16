import { PropsWithChildren } from 'react'

import { cn } from '@/shared/lib'
import { Card } from '@/shared/ui'

export type FloatButtonProps = { className?: string; onClick?: () => void } & PropsWithChildren

export const FloatButton = ({ children, className, onClick }: FloatButtonProps) => {
  return (
    <div
      className={cn(
        'group sticky bottom-0 z-20 w-fit cursor-pointer transition-transform duration-100 focus-visible:outline-none active:translate-y-1',
        className
      )}
      onClick={onClick}
      role={'button'}
      tabIndex={0}
    >
      <Card
        className={
          'rounded-full transition-shadow duration-300 group-hover:shadow group-hover:shadow-accent-500 group-focus-visible:shadow-md group-focus-visible:shadow-accent-700 group-focus-visible:outline group-focus-visible:outline-1 group-focus-visible:outline-accent-700 group-active:shadow-accent-100'
        }
      >
        {children}
      </Card>
    </div>
  )
}
