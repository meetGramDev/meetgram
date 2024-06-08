import { useState } from 'react'

import { Checkbox } from '@/shared/ui/checkbox/Checkbox'
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
    id: 'ActiveCheckbox',
    label: 'Check-box',
  },
}

export const UnactiveChackbox: Story = {
  args: {
    checked: false,
    id: 'UnactiveChackbox',
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

export const DisabledCheckbox: Story = {
  args: {
    checked: true,
    disabled: true,
    id: 'DisabledChackbox',
    label: 'DisabledChackbox',
  },
}

export const ChangingCheckbox = () => {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      checked={checked}
      id={'ChangingCheckbox'}
      label={'Check'}
      onValueChange={() => setChecked(!checked)}
    />
  )
}
