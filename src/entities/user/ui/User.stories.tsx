import { User } from '@/entities/user/ui/User'
import { StoreDecorator } from '@/shared/config/storybook'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: User,
  decorators: [StoreDecorator()],
  tags: ['autodocs'],
  title: 'entities/User',
} satisfies Meta<typeof User>

export default meta
type Story = StoryObj<typeof meta>

export const UserPage: Story = {
  args: {
    posts: {
      items: [],
      pageSize: 8,
      totalCount: 8,
      totalUsers: 1,
    },
    userData: {
      aboutMe: 'Some interesting info about me',
      avatars: [],
      city: 'Moscow',
      country: 'Northern Mariana Islands',
      createdAt: '1996-12-08T00:00:00.000Z',
      dateOfBirth: '1996-12-08T00:00:00.000Z',
      firstName: 'John',
      followersCount: 1,
      followingCount: 0,
      id: 590,
      isFollowedBy: false,
      isFollowing: true,
      lastName: 'Doe',
      publicationsCount: 13,
      region: '',
      userName: 'Sartoruis',
    },
  },
}
