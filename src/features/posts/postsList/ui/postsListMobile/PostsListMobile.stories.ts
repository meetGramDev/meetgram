import { Meta, StoryObj } from '@storybook/react'

import { PostsListMobile } from './PostsListMobile'

const meta = {
  component: PostsListMobile,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'features/posts/postsList/postsListMobile',
} satisfies Meta<typeof PostsListMobile>

export default meta
type Story = StoryObj<typeof meta>

const post = {
  avatarOwner:
    'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/2c568b8b-25b1-457d-9a15-67d97f446ae4_users/590/avatar/0fce4d56-f8bb-44ea-9ba5-97f072865d98-images-192x192',
  createdAt: '2024-08-07T14:49:21.967Z',
  description: '',
  id: 1297,
  images: [
    {
      createdAt: '2024-08-07T14:49:21.309Z',
      fileSize: 122982,
      height: 1440,
      uploadId: '66b38971c35c67dec5f39afd',
      url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/2cd4022e-8399-4050-a67c-fa3ec9ce170d_users/590/post/dd74fd82-31f3-4a21-acd2-3ba59ac10952-images-1440x1440',
      width: 1440,
    },
  ],
  isLiked: false,
  likesCount: 0,
  location: '',
  owner: { firstName: 'John', lastName: 'Doe' },
  ownerId: 590,
  updatedAt: '2024-08-07T14:49:21.967Z',
  userName: 'Sartoruis',
}

export const PostsListMobileComponent: Story = {
  args: {
    posts: [post, post, post, post, post, post],
  },
}
