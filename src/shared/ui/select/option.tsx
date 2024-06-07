import React, { forwardRef } from 'react'

import { cn } from '@/shared/lib/cn'
import * as SelectRadix from '@radix-ui/react-select'

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
   * The value given as data when submitted with a name
   */
  value: string
}

type OptionComponent = React.ForwardRefExoticComponent<
  React.RefAttributes<HTMLDivElement> & SelectRadix.SelectItemProps
>

export const Option: OptionComponent = forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <SelectRadix.Item className={cn('select-item')} {...props} ref={forwardedRef}>
        <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
      </SelectRadix.Item>
    )
  }
)
