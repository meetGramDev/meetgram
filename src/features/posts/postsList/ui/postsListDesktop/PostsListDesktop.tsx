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

  return (
    <div className={s.postsList}>
      {posts?.map(post => {
        const postCount: PostType = {
          alt: 'post',
          src: post.images[0].url,
        }

        return (
          <div className={s.item} key={post.id} onClick={() => isOpen(true)}>
            <Post
              alt={'post'}
              className={s.image}
              // height={post.images[0].height}
              src={post.images[0].url}
              // width={post.images[0].width}
            />
            <PostView
              avatarOwner={post.avatarOwner}
              id={post.id}
              isFollowing={post.isLiked}
              isOpen={isOpen}
              open={open}
              ownerId={post.ownerId}
              post={{
                alt: 'post',
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
          </div>
        )
      })}
    </div>
  )
}
