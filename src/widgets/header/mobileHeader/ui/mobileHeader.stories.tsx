import type { Meta, StoryObj } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook'

import { MobileHeader } from './MobileHeader'

const meta = {
  component: MobileHeader,
  decorators: [StoreDecorator()],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'Widget/MobileHeader',
} satisfies Meta<typeof MobileHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NotAuthorized: Story = {}
