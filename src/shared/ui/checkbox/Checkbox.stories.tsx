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
    onValueChange: () => {},
  },
}

export const InactiveChackbox: Story = {
  args: {
    checked: false,
    id: 'UnactiveChackbox',
    label: 'Check-box',
    onValueChange: () => {},
  },
}

export const ActiveCheckboxWithoutLabel: Story = {
  args: {
    checked: true,
    onValueChange: () => {},
  },
}
export const InactiveCheckboxWithoutLabel: Story = {
  args: {
    checked: false,
    onValueChange: () => {},
  },
}

export const DisabledActiveCheckbox: Story = {
  args: {
    checked: true,
    disabled: true,
    id: 'DisabledChackbox',
    label: 'Disabled Active Checkbox',
    onValueChange: () => {},
  },
}
export const DisabledInactiveCheckbox: Story = {
  args: {
    checked: false,
    disabled: true,
    id: 'DisabledChackbox',
    label: 'Disabled Inactive Checkbox',
    onValueChange: () => {},
  },
}

export const ChangingCheckbox = () => {
  const [checked, setChecked] = useState(false)
  const [disabled, setDisabled] = useState(false)

  return (
    <Checkbox
      checked={checked}
      disabled={disabled}
      id={'Changing checkbox'}
      label={'Changing Checkbox'}
      onValueChange={() => setChecked(!checked)}
    />
  )
}
