import { Profile } from '@/entities/user/ui/Profile'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Profile,
  tags: ['autodocs'],
  title: 'entities/Profile',
} satisfies Meta<typeof Profile>

export default meta
type Story = StoryObj<typeof meta>

export const ProfilePage: Story = {}
