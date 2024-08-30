import { useState } from 'react'

import { Post, PublicPost } from '@/entities/post'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import beach from '../../../../shared/assets/img/beach.png'
import photo from '../../../../shared/assets/img/photo-preview.png'
import someDude from '../../../../shared/assets/img/photo6.png'
import { PostView } from '../../ui/postView/PostView'

const myPost: PublicPost = {
  avatarOwner: String(photo),
  createdAt: new Date().toLocaleDateString(),
  description: 'Какое-то описание',
  id: 1,
  images: [
    {
      createdAt: '12.12.2012',
      fileSize: 200,
      height: 300,
      uploadId: '1',
      url: String(beach),
      width: 300,
    },
  ],
  isLiked: false,
  likesCount: 0,
  location: '',
  owner: {
    firstName: 'Petya',
    lastName: 'Ivanov',
  },
  ownerId: 1,
  updatedAt: '',
  userName: 'Petya',
}

const meta = {
  args: {
    isFollowing: false,
    isOpen: fn(),
    onEdit: fn(),
    open: false,
    post: myPost,
    postId: 1,
    userId: 1,
  },
  component: PostView,
  tags: ['autodocs'],
  title: 'entities/post/postView',
} satisfies Meta<typeof PostView>

export default meta
type Story = StoryObj<typeof meta>

export const PostsViewFromOwner: Story = {
  render: args => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <div onClick={() => setOpen(true)}>
          <Post alt={'Post'} src={beach} />
        </div>
        <PostView {...args} isOpen={setOpen} open={open} />
      </>
    )
  },
}

export const PostsViewFromSomeDude: Story = {
  render: args => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <div onClick={() => setOpen(true)}>
          <Post alt={'Post'} src={someDude} />
        </div>
        <PostView {...args} isOpen={setOpen} open={open} post={myPost} postId={1} userId={2} />
      </>
    )
  },
}
