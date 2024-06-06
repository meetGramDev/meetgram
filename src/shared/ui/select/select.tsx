'use client'
import React, { forwardRef } from 'react'

import { ArrowDown } from '@/shared/assets/icons/ArrowDown'
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

type SelectProps = {
  /**
   * Applied to the component that pops out when the select is open
   */
  contentClassName?: string
  disabled?: boolean
  error?: null | string
  /**
   * Display text above select button
   */
  label?: string
  options?: OptionType[]
  /**
   * The content that will be rendered inside the select button when no value or defaultValue is set.
   *  It should not be styled to ensure correct positioning
   */
  placeholder?: React.ReactNode
  /**
   * Specify a container element to portal the content into.
   * By default, portals the content part into the body
   */
  portal?: HTMLElement
  portalContainer?: HTMLElement | null
  required?: boolean
  /**
   * Uses to style the select button
   */
  rootClassName?: string
} & SelectRadix.SelectProps
type SelectType = React.ForwardRefExoticComponent<
  React.RefAttributes<HTMLButtonElement> & SelectProps
>

const Select: SelectType = forwardRef(
  (
    {
      children,
      contentClassName,
      disabled,
      error,
      label,
      options,
      placeholder,
      portal,
      required,
      rootClassName,
      ...restProps
    },
    forwardRef
  ) => {
    // classnames obj
    const classes = {
      arrowDownIcon: cn(
        'fill-light-100 transition-transform duration-300 group-data-[state=open]:rotate-180'
      ),
      content: cn('select-content', contentClassName),
      error: cn('ml-1 text-danger-300'),
      label: cn(
        'block text-regular14 text-light-900',
        required && 'after:ml-0.5 after:text-red-500 after:content-["*"]',
        rootClassName
      ),
      trigger: cn('select-trigger', 'group', error && 'border-danger-300', rootClassName),
    }

    return (
      <>
        {label && (
          <label className={classes.label} htmlFor={label}>
            {label}
          </label>
        )}
        <SelectRadix.Root disabled={disabled} {...restProps}>
          <SelectRadix.Trigger
            className={classes.trigger}
            disabled={disabled}
            id={label}
            ref={forwardRef}
          >
            <SelectRadix.Value placeholder={placeholder} />
            <SelectRadix.Icon>
              <ArrowDown className={classes.arrowDownIcon} />
            </SelectRadix.Icon>
          </SelectRadix.Trigger>

          <SelectRadix.Portal container={portal}>
            <SelectRadix.Content className={classes.content} position={'popper'}>
              <SelectRadix.Viewport>
                {children && children}
                {options &&
                  options.map(o => (
                    <Option key={o.value} {...o}>
                      {o.label}
                    </Option>
                  ))}
              </SelectRadix.Viewport>
            </SelectRadix.Content>
          </SelectRadix.Portal>
          {error && <span className={classes.error}>{error}</span>}
        </SelectRadix.Root>
      </>
    )
  }
)

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

export default Select
