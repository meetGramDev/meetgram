import { useState } from 'react'

import { Post, PostView, PublicPost } from '@/entities/post'
import { EditPostDialog } from '@/features/posts/editPost'

import s from './PostsList.module.scss'

import { PostListProps } from '../props.type'

export const PostsListDesktop = ({ isFollowing, posts, userId }: PostListProps) => {
  const [openPost, setOpenPost] = useState<boolean>(false)
  const [currentPost, setCurrentPost] = useState<PublicPost | null>(null)

  const [openEdit, setOpenEdit] = useState(false)

  const currentPostHandler = (post: PublicPost) => {
    setOpenPost(true)
    setCurrentPost(post)
  }

  const handleOnEditPost = () => {
    setOpenEdit(true)
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
      {openPost && currentPost && (
        <PostView
          isFollowing={isFollowing}
          isOpen={setOpenPost}
          onEdit={handleOnEditPost}
          open={openPost}
          post={currentPost}
          userId={userId}
        />
      )}

      {openEdit && currentPost && (
        <EditPostDialog
          onOpenChange={open => setOpenEdit(false)}
          open={openEdit}
          post={currentPost}
        />
      )}
    </div>
  )
}
