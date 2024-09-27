import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Photo } from '@/entities/photo'
import { Post, useGetSinglePublicPostQuery } from '@/entities/post'
import { PostDescriptionField, getPostDescriptionSchema } from '@/entities/post/validation/schema'
import { serverErrorHandler } from '@/shared/lib'
import { isErrorServerMessagesType } from '@/shared/types'
import { Button, Dialog, ImageCarousel, TextArea } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './EditPost.module.scss'

import notPhoto from '../../../../shared/assets/img/not-photo-user.jpg'
import { useEditPostMutation } from '../model/services/editPostApiSlice'

const MAX_DESCRIPTION_LENGTH = 500

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
  const [editPost] = useEditPostMutation()

  const {
    formState: { errors, isDirty, isSubmitting, isValid },
    handleSubmit,
    register,
    setError,
    watch,
  } = useForm<PostDescriptionField>({
    defaultValues: {
      description: post?.description ?? '',
    },
    mode: 'onChange',
    resolver: zodResolver(getPostDescriptionSchema()),
  })

  const textDescription = watch('description')

  const submitHandler = handleSubmit(async data => {
    if (!post) {
      return
    }

    try {
      await editPost({ description: data.description, postId: post.id }).unwrap()

      onOpenChange({ isSuccess: true, open: false })
    } catch (error) {
      const message = serverErrorHandler(error)

      if (typeof message === 'string') {
        toast.error(message)
      }

      if (isErrorServerMessagesType(message)) {
        message.forEach(msg => {
          setError(
            msg.field as keyof PostDescriptionField,
            { message: msg.message },
            { shouldFocus: true }
          )
        })
      }
    }
  })

  return (
    <Dialog
      modal
      onOpenChange={open => onOpenChange({ isDirty, open })}
      open={open}
      title={'Edit Post'}
    >
      {isSuccess && (
        <>
          <div className={'flex'}>
            <ImageCarousel className={s.post} images={post.images} />

            <form className={s.form} onSubmit={submitHandler}>
              <div className={'mb-6'}>
                <div className={'flex items-center gap-3'}>
                  <Photo
                    alt={'Owner avatar'}
                    height={36}
                    src={post.avatarOwner || notPhoto}
                    width={36}
                  />
                  <span className={'text-regular16 font-semibold text-light-100'}>
                    {post.userName}
                  </span>
                </div>
              </div>
              <div className={'flex h-[calc(100%_-_36px_-_24px)] flex-col justify-between'}>
                <div className={'w-full'}>
                  <div className={'w-full'}>
                    <TextArea
                      maxLength={MAX_DESCRIPTION_LENGTH}
                      rows={5}
                      {...register('description')}
                      error={errors.description?.message}
                      label={'Add publication description'}
                    />
                    <div className={'-mt-1 text-end'}>
                      <span
                        className={'text-small text-light-900'}
                      >{`${textDescription.length}/500`}</span>
                    </div>
                  </div>
                </div>
                <div className={'flex justify-end'}>
                  <Button disabled={!isValid || isSubmitting || !!errors.description || !isDirty}>
                    Save changes
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </Dialog>
  )
}
