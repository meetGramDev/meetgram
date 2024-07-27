import type { Meta, StoryObj } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook'
import { Header } from '@/widgets/header/ui/Header'

const meta = {
  component: Header,
  decorators: [StoreDecorator()],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'Widget/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    notification: 3,
  },
}

export const NotAuthorized: Story = {}
