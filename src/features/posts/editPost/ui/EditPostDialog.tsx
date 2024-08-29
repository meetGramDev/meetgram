import { useForm } from 'react-hook-form'

import { Photo } from '@/entities/photo'
import { Post, PublicPost } from '@/entities/post'
import { Button, Dialog, TextArea } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './EditPost.module.scss'

import notPhoto from '../../../../shared/assets/img/not-photo-user.jpg'
import { useEditPostMutation } from '../model/services/editPostApiSlice'
import { type EditPostField, getEditPostSchema } from '../validation/schema'

const MAX_DESCRIPTION_LENGTH = 500

type Props = {
  onOpenChange: (open: boolean) => void
  open: boolean
  post: PublicPost
}

export const EditPostDialog = ({ onOpenChange, open, post }: Props) => {
  const [editPost] = useEditPostMutation()

  const {
    formState: { errors, isDirty, isSubmitting, isValid, touchedFields },
    handleSubmit,
    register,
    watch,
  } = useForm<EditPostField>({
    defaultValues: {
      description: post.description,
    },
    mode: 'onChange',
    resolver: zodResolver(getEditPostSchema()),
  })

  const textDescription = watch('description')

  const submitHandler = handleSubmit(data => {
    editPost({ description: data.description, postId: post.id })
  })

  return (
    <Dialog onOpenChange={onOpenChange} open={open} title={'Edit Post'}>
      <div className={'flex'}>
        <div className={s.post}>
          <Post alt={'post'} src={post.images[0].url} />
        </div>
        <form className={s.form} onSubmit={submitHandler}>
          <div className={'mb-6'}>
            <div className={'flex items-center gap-3'}>
              <Photo
                alt={'Owner avatar'}
                height={36}
                src={post.avatarOwner || notPhoto}
                width={36}
              />
              <span className={'text-regular16 font-semibold text-light-100'}>{post.userName}</span>
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
              <Button disabled={!isValid || !touchedFields.description || isSubmitting}>
                Save changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  )
}
