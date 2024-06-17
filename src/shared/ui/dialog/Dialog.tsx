import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { CloseIcon } from '@/shared/assets/icons/CloseIcon'
import * as RadixModal from '@radix-ui/react-dialog'

import s from './Dialog.module.scss'

export type Props = {
  description?: string
  title?: string
} & ComponentPropsWithoutRef<typeof RadixModal.Content>

export const DialogContent = forwardRef<ElementRef<typeof RadixModal.Content>, Props>(
  ({ children, description, title, ...props }: Props, ref) => {
    return (
      <RadixModal.Portal>
        <RadixModal.Overlay className={s.overlay} />
        <RadixModal.Content className={s.content} ref={ref} {...props}>
          <div className={s.header}>
            <RadixModal.Title>{title}</RadixModal.Title>
            <DialogClose className={s.closeButton}>
              <CloseIcon />
            </DialogClose>
          </div>
          <div className={s.descriptionContainer}>
            <RadixModal.Description className={s.description}>{description}</RadixModal.Description>
          </div>
          {children}
        </RadixModal.Content>
      </RadixModal.Portal>
    )
  }
)

export const Dialog = RadixModal.Root
export const DialogTrigger = RadixModal.Trigger
export const DialogClose = RadixModal.Close
