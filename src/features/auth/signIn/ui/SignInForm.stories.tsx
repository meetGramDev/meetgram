import type { Meta, StoryObj } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook'
import { fn } from '@storybook/test'

import { SignInForm } from './SignInForm'

const meta = {
  args: {},
  component: SignInForm,
  decorators: [StoreDecorator()],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'features/auth/SignInForm',
} satisfies Meta<typeof SignInForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
}
