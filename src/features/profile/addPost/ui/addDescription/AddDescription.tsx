import { useRef } from 'react'
import { toast } from 'react-toastify'

import { PostDescriptionField, PostDescriptionForm, PostDescriptionFormRef } from '@/entities/post'
import { useGetProfileQuery } from '@/features/userSettings'
import { useActions, useAppSelector } from '@/shared/config/storeHooks'
import { serverErrorHandler, useClientProgress } from '@/shared/lib'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Nullable } from '@/shared/types'
import { dataURLToBlob } from 'blob-util'

import { selectImages } from '../../model/selectors/addPost.selectors'
import { useAddImagesMutation, useCreatePostMutation } from '../../model/services/addPost.service'
import { addPostActions } from '../../model/slice/addPostSlice'
import { AddingPostStage } from '../../model/types/addPostTypes'
import { AddDialogLayout } from '../common/AddDialogLayout'
import { DialogHeader } from '../common/DialogHeader'

export const AddDescription = () => {
  const t = useTranslate()

  const images = useAppSelector(selectImages)

  const { data: profile } = useGetProfileQuery()
  const [addImages, { isLoading: isLoadingAddImages }] = useAddImagesMutation()
  const [createPost, { isLoading: isLoadingCreatePost }] = useCreatePostMutation()

  const { closeAddingPost, setAddingPostStage } = useActions(addPostActions)

  const postDescriptionRef = useRef<Nullable<PostDescriptionFormRef>>(null)

  const handlePrevView = () => {
    setAddingPostStage(AddingPostStage.FILTERS)
  }

  const handlePublish = () => {
    postDescriptionRef.current?.onSubmitFormClick()
  }

  const handleOnSendPostImage = async ({ description }: PostDescriptionField) => {
    if (!images.length) {
      return
    }

    const formData = new FormData()

    images.forEach(el => {
      formData.append('file', dataURLToBlob(el.image))
    })

    try {
      const imagesResult = await addImages(formData).unwrap()

      const childrenMetadata = imagesResult.images.map(img => ({
        uploadId: img.uploadId,
      }))

      await createPost({
        childrenMetadata,
        description,
      }).unwrap()

      toast.success('Post added successfully.')
      closeAddingPost()
    } catch (e) {
      const message = serverErrorHandler(e)

      if (typeof message === 'string') {
        toast.error(message)
      } else {
        console.error(message)
      }
    }
  }

  useClientProgress(isLoadingAddImages)

  if (!profile) {
    return null
  }

  return (
    <>
      <DialogHeader
        header={'Publication'}
        nextBtnText={'Publish'}
        onBack={handlePrevView}
        onNext={handlePublish}
      />
      <AddDialogLayout images={images}>
        <PostDescriptionForm
          onSubmit={handleOnSendPostImage}
          ownerAvatar={profile.avatars.length ? profile.avatars[0].url : undefined}
          ownerUsername={profile.userName}
          ref={postDescriptionRef}
        />
      </AddDialogLayout>
    </>
  )
}
