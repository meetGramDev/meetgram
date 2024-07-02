import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { DatePicker } from './DatePicker'

const meta = {
  args: {
    onStartDateChange: fn(),
    startDate: new Date(),
  },
  component: DatePicker,
  tags: ['autodocs'],
  title: 'shared/DatePicker',
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Date',
  },

  render: ({ onStartDateChange, startDate, ...args }) => {
    const [start, setStart] = useState<Date | undefined>(new Date())

    return <DatePicker onStartDateChange={setStart} startDate={start} {...args} />
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

  render: ({ onStartDateChange, startDate, ...args }) => {
    const [start, setStart] = useState<Date | undefined>(new Date())

    return <DatePicker onStartDateChange={setStart} startDate={start} {...args} />
  },
}

export const DateRange: Story = {
  args: {
    label: 'Select range',
    selectsRange: true,
  },

  render: ({ endDate, onEndDateChange, onStartDateChange, startDate, ...args }) => {
    const [start, setStart] = useState<Date | undefined>(new Date())
    const [end, setEnd] = useState<Date | undefined>(undefined)

    return (
      <DatePicker
        endDate={end}
        onEndDateChange={setEnd}
        onStartDateChange={setStart}
        startDate={start}
        {...args}
      />
    )
  },
}

export const DateRangeWithError: Story = {
  args: {
    error: 'Error, select current month or last month',
    label: 'Select range',
    selectsRange: true,
  },

  render: ({ endDate, onEndDateChange, onStartDateChange, startDate, ...args }) => {
    const [start, setStart] = useState<Date | undefined>(new Date())
    const [end, setEnd] = useState<Date | undefined>(undefined)

    return (
      <DatePicker
        endDate={end}
        onEndDateChange={setEnd}
        onStartDateChange={setStart}
        startDate={start}
        {...args}
      />
    )
  },
}
