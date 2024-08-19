import { Meta, StoryObj } from '@storybook/react'

import { PostViewSelect } from './PostViewSelect'

const meta = {
  component: PostViewSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'entities/postViewSelect',
} satisfies Meta<typeof PostViewSelect>

export default meta
type Story = StoryObj<typeof meta>

export const PostsViewSelect: Story = {
  args: {
    id: 1,
    isFollowing: false,
    ownerId: 1,
  },
}
