import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { fn } from '@storybook/test'

import Select, { OptionType } from './select'

const items: OptionType[] = [
  { label: 'banana', value: 'banana' },
  { label: 'apple', value: 'apple' },
  { disabled: true, label: 'orange', value: 'orange' },
  { label: 'lemon', value: 'lemon' },
]

const meta = {
  args: {
    onOpenChange: fn(),
    onValueChange: fn(),
    options: items,
    placeholder: 'Select a fruit...',
  },
  component: Select,
  tags: ['autodocs'],
  title: 'UI/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    return <Select {...args} />
  },
}

export const SelectWithLabel: Story = {
  args: {
    label: 'Select box',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const LanguageSelector: Story = {
  args: {
    defaultValue: 'ru',
    options: [
      { label: 'Russian', value: 'ru' },
      { label: 'English', value: 'en' },
    ],
  },
  render: args => {
    const [value, setValue] = useState(args.defaultValue)

    return <Select defaultValue={value} onValueChange={v => setValue(v)} {...args} />
  },
}

export const OverflowContent: Story = {
  args: {
    options: Array.from({ length: 15 }, (_, i) => i).map(v => ({
      label: String(v),
      value: String(v),
    })),
    placeholder: 'Select...',
  },
}

export const SelectWithError: Story = {
  args: {
    disabled: true,
    error: 'Error',
  },
}

export const RequiredField: Story = {
  args: {
    error: 'Required',
    label: 'Select item',
    required: true,
  },
}
