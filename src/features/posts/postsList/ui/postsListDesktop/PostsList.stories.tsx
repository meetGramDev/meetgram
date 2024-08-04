import { Meta, StoryObj } from '@storybook/react'

import photo from '../../../../../shared/assets/img/photo-preview.png'
import photo1 from '../../../../../shared/assets/img/photo1.jpg'
import photo2 from '../../../../../shared/assets/img/photo2.png'
import photo3 from '../../../../../shared/assets/img/photo3.png'
import photo4 from '../../../../../shared/assets/img/photo4.png'
import photo5 from '../../../../../shared/assets/img/photo5.png'
import photo6 from '../../../../../shared/assets/img/photo6.png'
import photo7 from '../../../../../shared/assets/img/photo7.png'
import { PostsList } from './PostsList'

const meta = {
  component: PostsList,
  tags: ['autodocs'],
  title: 'features/posts/postsList/postsListDesktop',
} satisfies Meta<typeof PostsList>

export default meta
type Story = StoryObj<typeof meta>

export const PostsComponent: Story = {
  args: {
    images: [
      { alt: 'User photo', id: '1', src: photo },
      { alt: 'User photo', id: '2', src: photo1 },
      { alt: 'User photo', id: '3', src: photo2 },
      { alt: 'User photo', id: '4', src: photo3 },
      { alt: 'User photo', id: '5', src: photo4 },
      { alt: 'User photo', id: '6', src: photo5 },
      { alt: 'User photo', id: '7', src: photo6 },
      { alt: 'User photo', id: '8', src: photo7 },
    ],
  },
}
