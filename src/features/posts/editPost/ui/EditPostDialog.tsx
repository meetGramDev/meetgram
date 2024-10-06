import { useRef, useState } from 'react'

import {
  type PostDescriptionField,
  PostDescriptionForm,
  useGetSinglePublicPostQuery,
} from '@/entities/post'
import { ServerMessagesType } from '@/shared/api'
import { serverErrorHandler } from '@/shared/lib'
import { Dialog, ImageCarousel } from '@/shared/ui'

import s from './EditPost.module.scss'

import { useEditPostMutation } from '../model/services/editPostApiSlice'

export interface OnOpenChangeArgs {
  isDirty?: boolean
  isSuccess?: boolean
  open: boolean
}

type Props = {
  onOpenChange: ({ isDirty, isSuccess, open }: OnOpenChangeArgs) => void
  open: boolean
  postId: number
}

export const EditPostDialog = ({ onOpenChange, open, postId }: Props) => {
  const { data: post, isSuccess } = useGetSinglePublicPostQuery(`${postId}`)
  const [editPost, { isLoading: editPostLoading }] = useEditPostMutation()

  const [error, setError] = useState<ServerMessagesType[] | string>('')
  const isDirtyField = useRef(false)

  const submitHandler = async (data: PostDescriptionField, isDirty?: boolean) => {
    if (!post) {
      return
    }

    if (isDirty !== undefined) {
      isDirtyField.current = isDirty
    }

    try {
      await editPost({ description: data.description, postId: post.id }).unwrap()

      onOpenChange({ isSuccess: true, open: false })
    } catch (error) {
      const message = serverErrorHandler(error)

      setError(message)
    }
  }

  return (
    <Dialog
      modal
      onOpenChange={open => onOpenChange({ isDirty: isDirtyField.current, open })}
      open={open}
      title={'Edit Post'}
    >
      {isSuccess && (
        <div className={'flex'}>
          <ImageCarousel className={s.post} images={post.images} />
          <PostDescriptionForm
            disabled={editPostLoading}
            error={error}
            onSubmit={submitHandler}
            post={post}
          />
        </div>
      )}
    </Dialog>
  )
}
