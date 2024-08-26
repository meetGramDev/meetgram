import { useState } from 'react'

import { Post } from '@/entities/post'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import beach from '../../../../shared/assets/img/beach.png'
import photo from '../../../../shared/assets/img/photo-preview.png'
import someDude from '../../../../shared/assets/img/photo6.png'
import { PostView } from './PostView'

const meta = {
  args: {
    avatarOwner: photo,
    isFollowing: false,
    isOpen: fn(),
    open: false,
    ownerId: 1,
    post: { alt: 'Post', src: beach },
    postCreate: new Date(),
    postId: 1,
    postLikesCount: 5,
    userId: 1,
    userName: 'Petya',
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
        <PostView
          {...args}
          avatarOwner={''}
          isOpen={setOpen}
          open={open}
          post={{ alt: 'Post', src: someDude }}
          postCreate={new Date()}
          postId={1}
          userId={2}
          userName={'SomeDude'}
        />
      </>
    )
  },
}
