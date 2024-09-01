import { useState } from 'react'

import { Post, PostView, PublicPost } from '@/entities/post'
import { ConfirmClosingDialog } from '@/features/dialog/confirmClosing'
import { EditPostDialog, OnOpenChangeArgs } from '@/features/posts/editPost'
import { Nullable } from '@/shared/types'
import { Dialog } from '@/shared/ui'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import s from './PostsList.module.scss'

import { PostListProps } from '../props.type'

export const PostsListDesktop = ({ isFollowing, posts, userId }: PostListProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isOpenPost = searchParams?.get('isOpenPost')

  const [openPost, setOpenPost] = useState<Nullable<boolean>>(isOpenPost === 'true' || false)
  const [currentPostId, setCurrentPostId] = useState<Nullable<number>>(null)

  const [openEdit, setOpenEdit] = useState(false)
  const [openCloseEditingPost, setOpenCloseEditingPost] = useState(false)

  const currentPostHandler = (id: number) => {
    setOpenPost(true)
    setCurrentPostId(id)
  }

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

  return (
    <div className={s.postsList}>
      {posts?.map(post => {
        return (
          <div
            className={s.item}
            key={post.id}
            onClick={() => {
              currentPostHandler(post.id)
            }}
          >
            <Link href={`/profile/${router.query.userId}?postId=${post.id}&isOpenPost=true`}>
              <Post alt={'post'} className={s.image} src={post.images[0].url} />
            </Link>
          </div>
        )
      })}
      {openPost && currentPostId && (
        <PostView
          isFollowing={isFollowing}
          isOpen={setOpenPost}
          onEdit={() => setOpenEdit(true)}
          open={openPost}
          postId={currentPostId}
          userId={userId}
        />
      )}

      {openEdit && currentPostId && (
        <EditPostDialog
          onOpenChange={handleEditPostDialog}
          open={openEdit}
          postId={currentPostId}
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
