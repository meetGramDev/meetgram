import { StoreDecorator } from '@/shared/config/storybook'
import { Meta, StoryObj } from '@storybook/react'

import { LogOut } from './LogOut'

const meta = {
  component: LogOut,
  decorators: [StoreDecorator()],
  tags: ['autodocs'],
  title: 'features/auth/LogOut',
} satisfies Meta<typeof LogOut>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    email: 'Epam@epam.com',
  },
}
