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
    aboutMe: 'Грустненько',
    avatars: [{ createdAt: '', fileSize: 1, height: 204, url: '', width: 204 }],
    followersCount: 10,
    followingCount: 10,
    id: 1,
    onProfileSettingsClicked: () => {},
    publicationsCount: 0,
    userName: 'User',
  },
}
