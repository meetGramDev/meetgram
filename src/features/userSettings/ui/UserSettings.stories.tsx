import type { Meta, StoryObj } from '@storybook/react'

import { UserSettingsForm } from '@/features/userSettings'
import { StoreDecorator } from '@/shared/config/storybook'
import { fn } from '@storybook/test'

const meta = {
  args: {},
  component: UserSettingsForm,
  decorators: [StoreDecorator()],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'features/UserSettingsForm',
} satisfies Meta<typeof UserSettingsForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
}
