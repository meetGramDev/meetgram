import { useState } from 'react'

import { Photo, useDeletePhotoMutation, useUploadPhotoMutation } from '@/entities/photo'
import { Button, Dialog } from '@/shared/ui'

import s from './UploadPhoto.module.scss'

import { UploadPhotoForm } from './UploadPhotoForm'

export interface UploadedPhotoType {
  height: number
  src: string
  width: number
}

export const UploadPhoto = () => {
  const [upload] = useUploadPhotoMutation()
  const [remove] = useDeletePhotoMutation()

  const [avatar, setAvatar] = useState<UploadedPhotoType | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDialogClose = (open: boolean) => setOpen(open)

  const handleUploadPhoto = (file: File) => {
    const formData = new FormData()

    formData.append('file', file)

    console.log('Click Save btn', formData.get('file'))

    const reader = new FileReader()

    reader.addEventListener('load', function () {
      const src = reader.result

      if (src && typeof src === 'string') {
        setAvatar(state => ({ ...state, height: 192, src, width: 192 }))
      }
    })

    reader.readAsDataURL(file)

    // if error
    // setError("Error message")

    // if successful
    setOpen(false)
  }

  const handleDeletePhoto = () => {
    // remove()
    setAvatar(undefined)
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
        <UploadPhotoForm onSend={handleUploadPhoto} />
      </Dialog>
    </div>
  )
}
