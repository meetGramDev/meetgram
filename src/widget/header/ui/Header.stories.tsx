import type { Meta, StoryObj } from '@storybook/react'

import { Header } from '@/widget/header/ui/Header'

const meta = {
  component: Header,
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

export const NotAuthorized: Story = {
  args: {
    isAuth: false,
  },
}
