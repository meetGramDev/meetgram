'use client'
import React from 'react'

import * as SelectRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'

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
  /**
   * Uses to style select button
   */
  rootClassName?: string
} & SelectRadix.SelectProps
type SelectType = React.ForwardRefExoticComponent<
  React.RefAttributes<HTMLButtonElement> & SelectProps
>

const Select: SelectType = React.forwardRef(
  (
    {
      children,
      contentClassName,
      disabled,
      label,
      options,
      placeholder,
      portal,
      rootClassName,
      ...restProps
    },
    forwardRef
  ) => {
    return (
      <>
        {label && (
          <label className={'block text-regular14 text-light-900'} htmlFor={label}>
            {label}
          </label>
        )}
        <SelectRadix.Root disabled={disabled} {...restProps}>
          <SelectRadix.Trigger
            className={clsx('select-trigger')}
            disabled={disabled}
            id={label}
            ref={forwardRef}
          >
            <SelectRadix.Value placeholder={placeholder} />
            <SelectRadix.Icon>
              <svg
                className={'fill-light-100'}
                height={'24'}
                viewBox={'0 0 24 24'}
                width={'24'}
                xmlns={'http://www.w3.org/2000/svg'}
              >
                <path
                  d={
                    'M5.51416 9.45842C5.5137 9.22477 5.59508 8.99834 5.74416 8.81842C5.82811 8.71717 5.93121 8.63346 6.04756 8.57211C6.1639 8.51076 6.29121 8.47296 6.42219 8.46089C6.55316 8.44881 6.68524 8.46269 6.81084 8.50174C6.93644 8.54078 7.05311 8.60422 7.15416 8.68842L12.5142 13.1684L17.8842 8.84843C17.9864 8.76536 18.1041 8.70333 18.2305 8.6659C18.3568 8.62846 18.4893 8.61637 18.6203 8.63031C18.7514 8.64425 18.8784 8.68395 18.994 8.74712C19.1096 8.81029 19.2116 8.8957 19.2942 8.99843C19.3852 9.10189 19.4539 9.22306 19.4959 9.35432C19.5378 9.48558 19.5522 9.62411 19.5382 9.7612C19.5241 9.89829 19.4818 10.031 19.414 10.151C19.3462 10.271 19.2543 10.3756 19.1442 10.4584L13.1442 15.2884C12.9652 15.4355 12.7408 15.5159 12.5092 15.5159C12.2775 15.5159 12.0531 15.4355 11.8742 15.2884L5.87416 10.2884C5.75314 10.1881 5.65748 10.0607 5.59493 9.91646C5.53238 9.77225 5.50471 9.61533 5.51416 9.45842Z'
                  }
                />
              </svg>
            </SelectRadix.Icon>
          </SelectRadix.Trigger>

          <SelectRadix.Portal container={portal}>
            <SelectRadix.Content className={clsx('select-content')} position={'popper'}>
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
        </SelectRadix.Root>
      </>
    )
  }
)

type OptionProps = React.ForwardRefExoticComponent<
  React.RefAttributes<HTMLDivElement> & SelectRadix.SelectItemProps
>

const Option: OptionProps = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
  return (
    <SelectRadix.Item className={clsx('select-item')} {...props} ref={forwardedRef}>
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
    </SelectRadix.Item>
  )
})

export default Select
