import { useState } from 'react'

import { Post, PostView, PublicPost } from '@/entities/post'

import s from './PostsList.module.scss'

import { PostListProps } from '../props.type'

export const PostsListDesktop = ({ isFollowing, posts, userId }: PostListProps) => {
  const [openPost, setOpenPost] = useState<boolean>(false)
  const [currentPost, setCurrentPost] = useState<PublicPost | null>(null)

  const currentPostHandler = (post: PublicPost) => {
    setOpenPost(true)
    setCurrentPost(post)
  }

  return (
    <div className={s.postsList}>
      {posts?.map(post => {
        return (
          <div
            className={s.item}
            key={post.id}
            onClick={() => {
              currentPostHandler(post)
            }}
          >
            <Post alt={'post'} className={s.image} src={post.images[0].url} />
          </div>
        )
      })}
      {currentPost && (
        <PostView
          isFollowing={isFollowing}
          isOpen={setOpenPost}
          onEdit={() => {}}
          open={openPost}
          post={currentPost}
          userId={userId}
        />
      )}
    </div>
  )
}
