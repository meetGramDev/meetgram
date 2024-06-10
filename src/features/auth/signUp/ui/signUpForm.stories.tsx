import type { Meta, StoryObj } from '@storybook/react'

import { SignUpForm } from '@/features/auth/signUp/ui/SignUpForm'
import { fn } from '@storybook/test'

const meta = {
  args: {},
  component: SignUpForm,
  tags: ['autodocs'],
  title: 'features/auth/SignUpForm',
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
}
