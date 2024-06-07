import { useState } from 'react'

import { Checkbox } from '@/shared/ui/checkbox/checkbox'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  title: 'shared/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const ActiveCheckbox: Story = {
  args: {
    checked: true,
    label: 'Check-box',
  },
}

export const UnactiveChackbox: Story = {
  args: {
    checked: false,
    label: 'Check-box',
  },
}

export const ActiveChackboxWithoutLabel: Story = {
  args: {
    checked: true,
  },
}
export const UnactiveChackboxWithoutLabel: Story = {
  args: {
    checked: false,
  },
}
export const ChangingCheckbox = () => {
  const [checked, setChecked] = useState(false)

  return <Checkbox checked={checked} label={'Check'} onValueChange={() => setChecked(!checked)} />
}
