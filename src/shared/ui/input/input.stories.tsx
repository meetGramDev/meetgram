import type { Meta, StoryObj } from '@storybook/react'

import { ChangeEvent, useState } from 'react'

import { Input } from './input'

const meta = {
  args: {
    label: 'Input',
  },
  component: Input,
  tags: ['autodocs'],
  title: 'shared/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const TextType: Story = {
  args: {
    placeholder: 'Placeholder',
    type: 'text',
  },
}

export const TextTypeDisabled: Story = {
  args: {
    disabled: true,
    type: 'text',
    value: 'Some text',
  },
}

export const PasswordType: Story = {
  args: {
    placeholder: 'Placeholder',
    type: 'password',
  },
}

export const PasswordTypeDisabled: Story = {
  args: {
    disabled: true,
    type: 'password',
  },
}

export const SearchType: Story = {
  render: args => {
    const [value, setValue] = useState('')

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value)
    }

    const clearValue = () => setValue('')

    return (
      <Input
        clearValue={clearValue}
        label={'Input'}
        onChange={onValueChange}
        type={'search'}
        value={value}
        {...args}
      />
    )
  },
}

export const SearchTypeDisabled: Story = {
  args: {
    disabled: true,
    type: 'search',
  },
}

export const WithError: Story = {
  args: {
    error: 'Some error!',
    type: 'text',
    value: 'Input',
  },
}
