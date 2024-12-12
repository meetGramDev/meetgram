import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './RadioGroup'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Shared/Radio Group',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ],
  },
}

export const Disabled: Story = {
  args: {
    options: [
      { checked: true, disabled: true, label: 'One', value: 'one' },
      { disabled: true, label: 'Two', value: 'two' },
    ],
  },
}

export const Focus: Story = {
  args: {
    options: [
      { checked: true, label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ],
  },
}
