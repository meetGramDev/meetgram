import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Photo } from '@/entities/photo'
import { ServerMessagesType } from '@/shared/api'
import { cn } from '@/shared/lib'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Nullable, isErrorServerMessagesType } from '@/shared/types'
import { Button, TextArea } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './PostDescriptionForm.module.scss'

import notPhoto from '../../../../shared/assets/img/not-photo-user.jpg'
import { PublicPost } from '../../model/types/posts.types'
import { type PostDescriptionField, getPostDescriptionSchema } from '../../validation/schema'

const MAX_DESCRIPTION_LENGTH = 501

export type PostDescriptionFormRef = {
  onSubmitFormClick: () => void
}
type Props = {
  disabled?: boolean
  error?: ServerMessagesType[] | string
  /**
   * Return isDirty property of the form state
   */
  onChange?: (isDirty: boolean) => void
  onSubmit: (data: PostDescriptionField) => void
  ownerAvatar?: string
  ownerUsername?: string
  post?: PublicPost
}

export const PostDescriptionForm = forwardRef<PostDescriptionFormRef, Props>(
  ({ disabled, error, onChange, onSubmit, ownerAvatar, ownerUsername, post }, forwardedRef) => {
    const buttonRef = useRef<Nullable<HTMLButtonElement>>(null)
    const t = useTranslate()

    const {
      formState: { errors, isDirty, isSubmitting, isValid },
      getValues,
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

    useImperativeHandle(forwardedRef, () => {
      return {
        // expose click event to the parent element
        onSubmitFormClick() {
          buttonRef.current?.click()
        },
      }
    })

    const handleOnSubmitText = handleSubmit(data => {
      onSubmit(data)
    })

    useEffect(() => {
      if (isErrorServerMessagesType(error)) {
        setError(error[0].field as keyof PostDescriptionField, { message: error[0].message })
      }
    }, [error, setError, getValues])

    useEffect(() => {
      if (onChange) {
        onChange(isDirty)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDirty])

    return (
      <form className={s.form} onSubmit={handleOnSubmitText}>
        <div className={'mb-6'}>
          <div className={'flex items-center gap-3'}>
            <Photo
              alt={t('Owner avatar')}
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
                label={t('Add publication description')}
              />
              <div className={'-mt-1 text-end'}>
                <span
                  className={'text-small text-light-900'}
                >{`${textDescription.length}/500`}</span>
              </div>
            </div>
          </div>
          <div className={cn('flex justify-end', forwardedRef && 'pointer-events-none invisible')}>
            <Button
              disabled={!isValid || isSubmitting || !!errors.description || disabled}
              ref={buttonRef}
            >
              {t('Save changes')}
            </Button>
          </div>
        </div>
      </form>
    )
  }
)
