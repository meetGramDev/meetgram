import { useState } from 'react'
import { toast } from 'react-toastify'

import { PostDescriptionForm } from '@/entities/post'
import { ConfirmClosingDialog } from '@/features/dialog/confirmClosing'
import { useGetProfileQuery } from '@/features/userSettings'
import { useActions, useAppSelector } from '@/shared/config/storeHooks'
import { useClientProgress } from '@/shared/lib'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Dialog } from '@/shared/ui'
import { dataURLToBlob } from 'blob-util'

import s from './AddDescription.module.scss'

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

  const [description, setDescription] = useState('')

  const handlePrevView = () => {
    setAddingPostStage(AddingPostStage.FILTERS)
  }

  const onSendPostImage = async () => {
    if (images) {
      images.map(async el => {
        const formData = new FormData()

        formData.append('file', dataURLToBlob(el.data))
        try {
          const imagesResult = await addImages(formData).unwrap()

          await createPost({
            childrenMetadata: [imagesResult.images[0]],
            description,
          })
          toast.success('Post added successfully.')
          closeAddingPost()
        } catch (e) {
          console.log(e)
        }
      })
    }
  }

  useClientProgress(isLoadingAddImages || isLoadingCreatePost)

  if (!profile) {
    return null
  }

  return (
    <>
      <DialogHeader
        header={'Publication'}
        nextBtnText={'Publish'}
        onBack={handlePrevView}
        onNext={onSendPostImage}
      />
      <AddDialogLayout images={images}>
        <PostDescriptionForm
          onSubmit={() => {}}
          ownerAvatar={profile.avatars[0].url}
          ownerUsername={profile.userName}
        />
      </AddDialogLayout>
    </>
  )
}
