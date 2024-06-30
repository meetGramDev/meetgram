import { Meta, StoryObj } from '@storybook/react'

import { DatePicker } from './DatePicker'

const meta = {
  component: DatePicker,
  parameters: {
    // layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'shared/DatePicker',
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Date',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Date of birth',
  },
}

export const HasError: Story = {
  args: {
    error: 'Required',
    label: 'Date of birth',
    required: true,
  },
}

export const DateRange: Story = {
  args: {
    label: 'Select range',
    selectRange: true,
  },
}

export const DateRangeWithError: Story = {
  args: {
    error: 'Error, select current month or last month',
    label: 'Select range',
    selectRange: true,
  },
}
