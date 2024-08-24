import { useState } from 'react'

import { PostView } from '@/entities/post/postView'
import { Post, PostType } from '@/entities/post/ui/Post'
import { PublicPost } from '@/features/profile/addPost'

import s from './PostsList.module.scss'

type Props = {
  posts: PublicPost[]
}

export const PostsListDesktop = ({ posts }: Props) => {
  const [open, isOpen] = useState<boolean>(false)
  const [postUser, setPost] = useState<PublicPost | null>(null)

  return (
    <div className={s.postsList}>
      {posts?.map(post => {
        return (
          <div
            className={s.item}
            key={post.id}
            onClick={() => {
              isOpen(!open)
              setPost(post)
            }}
          >
            <Post
              alt={'post'}
              className={s.image}
              // width={post.images[0].width}

              // height={post.images[0].height}
              src={post.images[0].url}
            />
            {!!postUser && (
              <PostView
                {...postUser}
                isFollowing={false}
                isOpen={isOpen}
                open={open}
                post={{
                  alt: 'post',
                  className: s.image,
                  src: postUser.images[0].url,
                }}
                postCreate={new Date()}
                postId={postUser.id}
                postLikesCount={postUser.likesCount}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
