import type { Meta, StoryObj } from '@storybook/react'

import { Sidebar } from './Sidebar'

const meta: Meta<typeof Sidebar> = {
  args: {},
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'widget/Sidebar',
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
