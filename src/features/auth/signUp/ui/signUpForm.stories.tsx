import type { Meta, StoryObj } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook'
import { fn } from '@storybook/test'

import { SignUpForm } from './SignUpForm'

const meta = {
  args: {},
  component: SignUpForm,
  decorators: [StoreDecorator()],
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
