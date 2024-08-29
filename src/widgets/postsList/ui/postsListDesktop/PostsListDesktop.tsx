import { useState } from 'react'

import { Post, PostView, PublicPost } from '@/entities/post'
import { ConfirmClosingDialog } from '@/features/dialog/confirmClosing'
import { EditPostDialog } from '@/features/posts/editPost'
import { Dialog } from '@/shared/ui'

import s from './PostsList.module.scss'

import { PostListProps } from '../props.type'

export const PostsListDesktop = ({ isFollowing, posts, userId }: PostListProps) => {
  const [openPost, setOpenPost] = useState<boolean>(false)
  const [currentPost, setCurrentPost] = useState<PublicPost | null>(null)

  const [openEdit, setOpenEdit] = useState(false)
  const [openCloseEditingPost, setOpenCloseEditingPost] = useState(false)

  const currentPostHandler = (post: PublicPost) => {
    setOpenPost(true)
    setCurrentPost(post)
  }

  const handleCloseEditDialog = (isConfirm: boolean) => {
    if (isConfirm) {
      setOpenCloseEditingPost(false)
      setOpenEdit(false)
    } else {
      setOpenCloseEditingPost(false)
    }
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
          onEdit={() => setOpenEdit(true)}
          open={openPost}
          post={currentPost}
          userId={userId}
        />
      )}

      {openEdit && currentPost && (
        <EditPostDialog
          onOpenChange={() => setOpenCloseEditingPost(true)}
          open={openEdit}
          post={currentPost}
        />
      )}

      {openCloseEditingPost && (
        <Dialog
          onOpenChange={() => setOpenCloseEditingPost(false)}
          open={openCloseEditingPost}
          title={'Close Post'}
        >
          <ConfirmClosingDialog
            message={
              'Do you really want to finish editing? If you close the changes you have made will not be saved.'
            }
            onConfirm={handleCloseEditDialog}
          />
        </Dialog>
      )}
    </div>
  )
}
