import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './RadioGroup.module.scss'

import { RadioItem } from './radioItem/RadioGroupItem'

export type RadioGroupProps = {
  options: {
    checked?: boolean
    disabled?: boolean
    label: string
    value: string
  }[]
} & Omit<ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>, 'asChild'>

export const RadioGroup = forwardRef<ElementRef<typeof RadixRadioGroup.Root>, RadioGroupProps>(
  (props, ref) => {
    const { className, options, ...rest } = props

    return (
      <RadixRadioGroup.Root className={clsx(s.radioGroup, className)} {...rest} ref={ref}>
        {options.map((el, index) => (
          <span className={clsx(s.labelWrapper, el.disabled && s.disabled, className)} key={index}>
            <RadioItem {...el} id={el.value} />
            <label
              aria-disabled={el.disabled}
              className={clsx(s.label, el.disabled && s.disabled)}
              onClick={() => document.getElementById(el.value)?.click()}
            >
              {el.label}
            </label>
          </span>
        ))}
      </RadixRadioGroup.Root>
    )
  }
)
