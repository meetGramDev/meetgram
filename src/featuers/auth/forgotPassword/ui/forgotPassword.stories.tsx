import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPasswordForm } from '@/featuers/auth/forgotPassword/ui/ForgotPasswordForm'
import { fn } from '@storybook/test'

const meta = {
  args: {},
  component: ForgotPasswordForm,
  tags: ['autodocs'],
  title: 'features/auth/ForgotPasswordForm',
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
}
