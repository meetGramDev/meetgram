import type { Meta, StoryObj } from '@storybook/react'

import { fn } from '@storybook/test'

import { SignUpForm } from './SignUpForm'

const meta = {
  args: {},
  component: SignUpForm,
  parameters: {
    layout: 'centered',
  },
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
