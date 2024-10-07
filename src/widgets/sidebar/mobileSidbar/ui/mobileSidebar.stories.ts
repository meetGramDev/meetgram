import type { Meta, StoryObj } from '@storybook/react'

import { MobileSidebar } from './MobileSidebar'

const meta: Meta<typeof MobileSidebar> = {
  args: {},
  component: MobileSidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'widget/Sidebar',
}

export default meta

type Story = StoryObj<typeof meta>

export const mobile: Story = {}
