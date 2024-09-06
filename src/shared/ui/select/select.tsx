'use client'
import React, { ElementRef, forwardRef } from 'react'

import { ArrowDown } from '@/shared/assets/icons/ArrowDown'
import { cn } from '@/shared/lib/cn'
import { Option, OptionType } from '@/shared/ui/select/option'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

type Props = {
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
  required?: boolean
  /**
   * Uses to style the select button
   */
  rootClassName?: string
  showArrow?: boolean
  /**
   * Renders a Select subtree in a different part of the DOM
   * You can specify a DOM element by passing portal prop
   * If true, it will be append to `document.body` by default
   */
  withPortal?: boolean
} & SelectRadix.SelectProps

export const Select = forwardRef<ElementRef<typeof SelectRadix.Trigger>, Props>(
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
      showArrow = true,
      withPortal = true,
      ...restProps
    },
    forwardRef
  ) => {
    const classes = {
      arrowDownIcon: cn(s.arrowDownIcon),
      content: cn(s.content, contentClassName),
      error: cn(s.error),
      label: cn(s.label, required && s.required, rootClassName),
      trigger: cn(s.trigger, error && s.hasError, rootClassName),
    }

    const optionsToRender = children ? 'children' : 'options'
    const contentToRender = (
      <SelectRadix.Content className={classes.content} position={'popper'}>
        <ScrollArea.Root className={s.scrollAreaRoot} type={'auto'}>
          <SelectRadix.Viewport asChild>
            <ScrollArea.Viewport className={s.scrollAreaViewport} style={{ overflowY: undefined }}>
              {optionsToRender === 'children' && children}
              {optionsToRender === 'options' &&
                options?.map(option => (
                  <Option key={option.value} {...option}>
                    {option.label}
                  </Option>
                ))}
            </ScrollArea.Viewport>
          </SelectRadix.Viewport>

          <ScrollArea.Scrollbar className={s.scrollbar} orientation={'vertical'}>
            <ScrollArea.Thumb className={s.scrollbarThumb} />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </SelectRadix.Content>
    )

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
            {showArrow && (
              <SelectRadix.Icon>
                <ArrowDown className={classes.arrowDownIcon} />
              </SelectRadix.Icon>
            )}
          </SelectRadix.Trigger>

          {withPortal ? (
            <SelectRadix.Portal container={portal}>{contentToRender}</SelectRadix.Portal>
          ) : (
            contentToRender
          )}
          {error && <span className={classes.error}>{error}</span>}
        </SelectRadix.Root>
      </>
    )
  }
)
