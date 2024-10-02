import { useState } from 'react'

import { Post, PostView } from '@/entities/post'
import { ConfirmClosingDialog } from '@/features/dialog/confirmClosing'
import { EditPostDialog, OnOpenChangeArgs } from '@/features/posts/editPost'
import { HOME } from '@/shared/config/router'
import { Dialog } from '@/shared/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './PostsList.module.scss'

import { PostListProps } from '../props.type'

export const PostsListDesktop = ({ isFollowing, posts, userId }: PostListProps) => {
  const router = useRouter()
  const isOpenPost = router.query.isOpenPost as string
  const postId = router.query.postId as string

  const [openEdit, setOpenEdit] = useState(false)
  const [openCloseEditingPost, setOpenCloseEditingPost] = useState(false)

  const handleEditPostDialog = ({ isDirty, isSuccess }: OnOpenChangeArgs) => {
    if (!isDirty) {
      setOpenEdit(false)

      return
    }

    if (isSuccess) {
      setOpenEdit(false)
    } else {
      setOpenCloseEditingPost(true)
    }
  }

  const handleCloseEditDialog = (isConfirm: boolean) => {
    if (isConfirm) {
      setOpenCloseEditingPost(false)
      setOpenEdit(false)
    } else {
      setOpenCloseEditingPost(false)
    }
  }

  const handleCloseModalDialog = (open: boolean) => {
    !open && router.push(`${HOME}/${userId}`, undefined, { shallow: true })
  }

  return (
    <div className={s.postsList}>
      {posts?.map(post => {
        return (
          <div className={s.item} key={post.id}>
            <Link
              href={`/profile/${router.query.userId}?postId=${post.id}&isOpenPost=true`}
              shallow
            >
              <Post
                alt={post.description}
                className={s.image}
                isGallery={post.images.length > 1}
                src={post.images[0].url}
              />
            </Link>
          </div>
        )
      })}
      {isOpenPost && postId && (
        <PostView
          isFollowing={isFollowing}
          isOpen={handleCloseModalDialog}
          onEdit={() => setOpenEdit(true)}
          open={isOpenPost === 'true'}
          postId={+postId}
          userId={userId}
        />
      )}

      {openEdit && postId && (
        <EditPostDialog onOpenChange={handleEditPostDialog} open={openEdit} postId={+postId} />
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
