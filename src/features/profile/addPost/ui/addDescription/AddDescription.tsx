import { useState } from 'react'
import { toast } from 'react-toastify'

import { Photo } from '@/entities/photo'
import { useGetProfileQuery } from '@/features/userSettings'
import ArrowBack from '@/shared/assets/icons/arrow-back.svg'
import { useAppDispatch, useAppSelector } from '@/shared/config/storeHooks'
import { useClientProgress } from '@/shared/lib'
import { Button, TextArea } from '@/shared/ui'
import { ButtonIcon } from '@/shared/ui/buttonIcon/ButtonIcon'
import { dataURLToBlob } from 'blob-util'
import Image from 'next/image'

import s from './AddDescription.module.scss'

import { useAddImagesMutation, useCreatePostMutation } from '../../model/services/addPost.service'
import { setOpenModal, setPostView } from '../../model/slice/addPostSlice'
import { PostView } from '../../model/types/addPostTypes'

export const AddDescription = () => {
  const images = useAppSelector(state => state.addPost.images)
  const { data: profile } = useGetProfileQuery()
  const [addImages, { isLoading: isLoadingAddImages }] = useAddImagesMutation()
  const [createPost, { isLoading: isLoadingCreatePost }] = useCreatePostMutation()
  const dispatch = useAppDispatch()

  const [description, setDescription] = useState('')

  const handlePrevView = () => {
    dispatch(setPostView(PostView.IMAGE))
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
          dispatch(setOpenModal(false))
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
    <div className={s.root}>
      <div className={s.header}>
        <ButtonIcon onClick={handlePrevView}>
          <Image alt={'arrow-back'} src={ArrowBack} />
        </ButtonIcon>
        <div>Publication</div>
        <Button onClick={onSendPostImage} variant={'text'}>
          Publish
        </Button>
      </div>
      <div className={s.newPost}>
        <div className={s.postImg}>
          <Image alt={'post image'} height={250} src={images[0].image} width={500} />
        </div>
        <div className={s.info}>
          <div className={s.userData}>
            <Photo alt={'avatar'} height={30} src={profile?.avatars[0].url ?? ''} width={30} />
            <span>{profile.userName}</span>
          </div>
          <TextArea
            label={'Add publication descriptions'}
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
        </div>
      </div>
    </div>
  )
}
