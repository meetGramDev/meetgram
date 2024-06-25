import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPassword } from '@/features/auth/createNewPassword/ui/CreateNewPassword'
import { fn } from '@storybook/test'

const meta = {
  args: {},
  component: CreateNewPassword,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'features/auth/CreateNewPassword',
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
}
