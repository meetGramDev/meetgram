/* eslint-disable no-console */
import { useState } from 'react'

import {
  Photo,
  useDeleteProfilePhotoMutation,
  useUploadProfilePhotoMutation,
} from '@/entities/photo'
import { useClientProgress } from '@/shared/lib'
import { Button, Dialog } from '@/shared/ui'

import s from './UploadPhoto.module.scss'

import { UploadPhotoForm } from './UploadPhotoForm'

export interface UploadedPhotoType {
  height: number
  src: string
  width: number
}

export const UploadPhoto = () => {
  const [upload, { isError, isLoading: isUploadLoading, isSuccess }] =
    useUploadProfilePhotoMutation()
  const [remove, { isLoading: isRemoveLoading }] = useDeleteProfilePhotoMutation()

  const [avatar, setAvatar] = useState<UploadedPhotoType | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')

  useClientProgress(isUploadLoading || isRemoveLoading)

  const handleDialogClose = (open: boolean) => setOpen(open)

  const handleUploadPhoto = async (file: File) => {
    const formData = new FormData()

    formData.append('file', file)

    console.log('Click Save btn', formData.get('file'))

    /*     const reader = new FileReader()
    
    reader.addEventListener('load', function () {
      const src = reader.result

      if (src && typeof src === 'string') {
        setAvatar(state => ({ ...state, height: 192, src, width: 192 }))
      }
      })
      
      reader.readAsDataURL(file) */
    try {
      const resp = await upload({ file: JSON.stringify(file) }).unwrap()

      // if successful
      if (isSuccess) {
        const avatar = resp.avatars[0]

        setAvatar({ height: avatar.height, src: avatar.url, width: avatar.width })
        setOpen(false)
      }
    } catch (error) {
      console.error(error)
      // if error
      if (isError) {
        setError('Error message')
      }
    }
  }

  const handleDeletePhoto = async () => {
    try {
      const resp = await remove({}).unwrap()

      console.log(resp)

      setAvatar(undefined)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={'flex h-full w-full flex-col items-center gap-6 text-center'}>
      {!avatar ? (
        <Photo type={'empty'} />
      ) : (
        <Photo
          alt={'Avatar'}
          height={avatar?.height}
          onDelete={handleDeletePhoto}
          src={avatar.src}
          width={avatar?.width}
        />
      )}

      <Dialog
        className={s.dialog}
        onOpenChange={handleDialogClose}
        open={open}
        title={'Add a Profile Photo'}
        trigger={
          <Button fullWidth variant={'outlined'}>
            Add a profile photo
          </Button>
        }
      >
        <UploadPhotoForm onErrorMessage={error} onSend={handleUploadPhoto} />
      </Dialog>
    </div>
  )
}
