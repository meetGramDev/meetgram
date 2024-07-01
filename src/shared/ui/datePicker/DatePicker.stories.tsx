import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { DatePicker } from './DatePicker'

const meta = {
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

  render: args => {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date())

    return <DatePicker onStartDateChange={setStartDate} startDate={startDate} {...args} />
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Date of birth',
  },

  render: args => {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date())

    return <DatePicker onStartDateChange={setStartDate} startDate={startDate} {...args} />
  },
}

export const HasError: Story = {
  args: {
    error: 'Required',
    label: 'Date of birth',
    required: true,
  },

  render: args => {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date())

    return <DatePicker onStartDateChange={setStartDate} startDate={startDate} {...args} />
  },
}

export const DateRange: Story = {
  args: {
    label: 'Select range',
    selectsRange: true,
  },

  render: args => {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date())
    const [endDate, setEndDate] = useState<Date | undefined>(undefined)

    return (
      <DatePicker
        endDate={endDate}
        onEndDateChange={setEndDate}
        onStartDateChange={setStartDate}
        startDate={startDate}
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

  render: args => {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date())
    const [endDate, setEndDate] = useState<Date | undefined>(undefined)

    return (
      <DatePicker
        endDate={endDate}
        onEndDateChange={setEndDate}
        onStartDateChange={setStartDate}
        startDate={startDate}
        {...args}
      />
    )
  },
}
