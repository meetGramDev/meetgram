import { Meta, StoryObj } from '@storybook/react'

import avatar from '../../../../shared/assets/img/photo-preview.png'
import avatar2 from '../../../../shared/assets/img/photo6.png'
import { Comments } from './Comments'

const meta = {
  component: Comments,
  tags: ['autodocs'],
  title: 'features/posts/comments',
} satisfies Meta<typeof Comments>

export default meta
type Story = StoryObj<typeof meta>

export const CommentsOfPost: Story = {
  args: {
    comments: {
      items: [
        {
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
        {
          answerCount: 0,
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, adipisci assumenda blanditiis corporis doloribus error, excepturi fugit in incidunt ipsam itaque minima molestiae neque nesciunt nulla provident repellat temporibus voluptatum.',
          createdAt: '2024-08-26T14:07:07.652Z',
          from: {
            avatars: [
              {
                url: avatar2,
              },
            ],
            id: 2,
            username: 'userVasya',
          },
          id: 0,
          isLiked: false,
          likeCount: 0,
          postId: 0,
        },
      ],
    },
    onClick: () => {},
  },
}
