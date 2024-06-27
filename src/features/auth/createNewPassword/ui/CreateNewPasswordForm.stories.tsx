import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPasswordForm } from '@/features/auth/createNewPassword/ui/CreateNewPasswordForm'
import { fn } from '@storybook/test'

const meta = {
  args: {},
  component: CreateNewPasswordForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'features/auth/CreateNewPasswordForm',
} satisfies Meta<typeof CreateNewPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
}
