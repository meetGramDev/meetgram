import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPasswordForm } from '@/features/auth/forgotPassword/ui/ForgotPasswordForm'
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
    isFormSended: false,
    onSubmit: fn(),
  },
}

export const ReturnValue: Story = {
  args: {
    isFormSended: false,
    onSubmit: data => {
      console.log(data)
    },
  },
}
