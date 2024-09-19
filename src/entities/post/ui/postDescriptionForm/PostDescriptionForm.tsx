import { useForm } from 'react-hook-form'

import { Photo } from '@/entities/photo'
import { Button, TextArea } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './PostDescriptionForm.module.scss'

import notPhoto from '../../../../shared/assets/img/not-photo-user.jpg'
import { PublicPost } from '../../model/types/posts.types'
import { type PostDescriptionField, getPostDescriptionSchema } from '../../validation/schema'

const MAX_DESCRIPTION_LENGTH = 500

type Props = {
  onSubmit: (data: PostDescriptionField) => void
  ownerAvatar?: string
  ownerUsername?: string
  post?: PublicPost
}

export const PostDescriptionForm = ({ onSubmit, ownerAvatar, ownerUsername, post }: Props) => {
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

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={'mb-6'}>
        <div className={'flex items-center gap-3'}>
          <Photo
            alt={'Owner avatar'}
            height={36}
            src={post?.avatarOwner || ownerAvatar || notPhoto}
            width={36}
          />
          <span className={'text-regular16 font-semibold text-light-100'}>
            {post?.userName || ownerUsername}
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
              <span className={'text-small text-light-900'}>{`${textDescription.length}/500`}</span>
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
  )
}
