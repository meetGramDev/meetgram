import { useState } from 'react'

import { PostView } from '@/entities/post/postView'
import { Post } from '@/entities/post/ui/Post'
import { PublicPost } from '@/features/profile/addPost'

import s from './PostsList.module.scss'

type Props = {
  posts: PublicPost[]
}

export const PostsListDesktop = ({ posts }: Props) => {
  const [open, isOpen] = useState<boolean>(true)

  return (
    <div className={s.postsList}>
      {posts?.map(post => (
        <div className={s.item} key={post.id}>
          <PostView
            avatarOwner={post.avatarOwner}
            id={post.id}
            isFollowing={post.isLiked}
            isOpen={isOpen}
            open={open}
            ownerId={post.ownerId}
            post={{
              alt: `post`,
              className: s.image,
              height: post.images[0].height,
              src: post.images[0].url,
              width: post.images[0].width,
            }}
            postCreate={new Date()}
            postId={post.id}
            postLikesCount={post.likesCount}
            userName={post.userName}
          />
          {/*<Post*/}
          {/*  alt={'post'}*/}
          {/*  className={s.image}*/}
          {/*  height={post.images[0].height}*/}
          {/*  src={post.images[0].url}*/}
          {/*  width={post.images[0].width}*/}
          {/*/>*/}
        </div>
      ))}
    </div>
  )
}
