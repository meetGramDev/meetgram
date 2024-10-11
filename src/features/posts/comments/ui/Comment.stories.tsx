import { Meta, StoryObj } from '@storybook/react'

import avatar from '../../../../shared/assets/img/photo-preview.png'
import { Comment } from './Comment'

const meta = {
  argTypes: {
    onClick: { action: 'clicked' },
  },
  component: Comment,
  tags: ['autodocs'],
  title: 'features/posts/comment',
} satisfies Meta<typeof Comment>

export default meta
type Story = StoryObj<typeof meta>

export const CommentsOfPost: Story = {
  args: {
    comment: {
      answerCount: 0,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, adipisci assumenda blanditiis corporis doloribus error, excepturi fugit in incidunt ipsam itaque minima molestiae neque nesciunt nulla provident repellat temporibus voluptatum.',
      createdAt: '2023-08-27T14:07:07.652Z',
      from: {
        avatars: [
          {
            url: avatar,
          },
        ],
        id: 0,
        username: 'userPetya',
      },
      id: 1,
      isLiked: true,
      likeCount: 1,
      postId: 0,
    },
    onClick: () => {},
  },
}
