import type { Meta, StoryObj } from '@storybook/react'

import { fn } from '@storybook/test'

import { CreateNewPasswordForm } from './CreateNewPasswordForm'

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
