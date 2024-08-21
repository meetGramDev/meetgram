import { ElementRef, forwardRef } from 'react'

import { cn } from '@/shared/lib/cn'
import * as SelectRadix from '@radix-ui/react-select'

import s from './option.module.scss'

export type OptionType = {
  disabled?: boolean
  /**
   * Option's text content
   */
  label: number | string
  /**
   * Optional text used for typeahead purposes.
   * Use this when the content is complex, or you have non-textual content inside.
   */
  textValue?: string
  /**
   * The value given as data when submitted  a namewith
   */
  value: string
}

export const Option = forwardRef<ElementRef<typeof SelectRadix.Item>, SelectRadix.SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <SelectRadix.Item className={cn(s.item, className)} {...props} ref={forwardedRef}>
        <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
      </SelectRadix.Item>
    )
  }
)
