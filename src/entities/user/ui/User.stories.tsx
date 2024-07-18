import { User } from '@/entities/user/ui/User'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: User,
  tags: ['autodocs'],
  title: 'entities/User',
} satisfies Meta<typeof User>

export default meta
type Story = StoryObj<typeof meta>

export const UserPage: Story = {
  args: {
    onProfileSettingsClicked: () => {},
    userName: 'User',
  },
}
