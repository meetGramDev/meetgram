import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { CloseIcon } from '@/shared/assets/icons/CloseIcon'
import * as RadixModal from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import s from './Dialog.module.scss'
export type Props = {
  className?: string
  title?: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof RadixModal.Root>

export const Dialog = forwardRef<ElementRef<typeof RadixModal.Content>, Props>(
  ({ children, className, title, trigger, ...props }: Props, ref) => {
    return (
      <RadixModal.Root {...props}>
        {trigger && <RadixModal.Trigger asChild>{trigger}</RadixModal.Trigger>}
        <RadixModal.Portal>
          <RadixModal.Overlay className={s.overlay} />
          <RadixModal.Content className={clsx(s.content, className)} ref={ref}>
            {title && (
              <div className={s.header}>
                <RadixModal.Title>{title}</RadixModal.Title>
                <RadixModal.DialogClose>
                  <CloseIcon className={s.closeButton} />
                </RadixModal.DialogClose>
              </div>
            )}
            {children}
          </RadixModal.Content>
        </RadixModal.Portal>
      </RadixModal.Root>
    )
  }
)
