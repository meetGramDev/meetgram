import React, { useState } from 'react'

import { PostView } from '@/entities/post/postView'
import { Post, PostType } from '@/entities/post/ui/Post'
import { PublicPost } from '@/features/profile/addPost'

import s from './PostsList.module.scss'

type Props = {
  posts: PublicPost[]
}

export const PostsListDesktop = ({ posts }: Props) => {
  const [openPost, setOpenPost] = useState<boolean>(false)
  const [currentPost, setCurrentPost] = useState<PublicPost | null>(null)

  return (
    <div className={s.postsList}>
      {posts?.map(post => {
        return (
          <div
            className={s.item}
            key={post.id}
            onClick={e => {
              if (e.currentTarget) {
                setOpenPost(true)
                setCurrentPost(post)
              }
            }}
          >
            <Post alt={'post'} className={s.image} src={post.images[0].url} />
          </div>
        )
      })}
      {currentPost && (
        <PostView
          avatarOwner={currentPost.avatarOwner}
          isFollowing={false}
          isOpen={setOpenPost}
          open={openPost}
          ownerId={currentPost.ownerId}
          post={{
            alt: 'post',
            className: s.image,
            src: currentPost.images[0].url,
          }}
          postCreate={new Date()}
          postId={currentPost.id}
          postLikesCount={currentPost.likesCount}
          userId={currentPost.ownerId}
          userName={currentPost.userName}
        />
      )}
    </div>
  )
}
