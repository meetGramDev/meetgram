import { Meta, StoryObj } from '@storybook/react'

import photo from '../../../shared/assets/img/photo-preview.png'
import { Post } from './Post'

const meta = {
  args: {
    alt: 'User photo',
    src: photo,
  },
  component: Post,
  tags: ['autodocs'],
  title: 'entities/Post',
} satisfies Meta<typeof Post>

export default meta
type Story = StoryObj<typeof meta>

export const PostComponent: Story = {}
