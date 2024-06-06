import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { fn } from '@storybook/test'

import Select, { OptionType } from './select'

const meta = {
  args: { onOpenChange: fn(), onValueChange: fn() },
  component: Select,
  tags: ['autodocs'],
  title: 'UI/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const items: OptionType[] = [
  { label: 'banana', value: 'banana' },
  { label: 'apple', value: 'apple' },
  { disabled: true, label: 'orange', value: 'orange' },
  { label: 'lemon', value: 'lemon' },
]

export const Default: Story = {
  args: {
    options: items,
    placeholder: 'Select a fruit...',
  },

  render: args => {
    return <Select {...args} />
  },
}

export const SelectWithLabel: Story = {
  args: {
    label: 'Select box',
    options: items,
    placeholder: 'Select a fruit...',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    options: items,
    placeholder: 'Select a fruit...',
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
