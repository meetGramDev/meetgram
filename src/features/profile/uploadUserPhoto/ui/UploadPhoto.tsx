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
  url: string
  width: number
}

type Props = {
  profileAvatar?: UploadedPhotoType
}

export const UploadPhoto = ({ profileAvatar }: Props) => {
  const [upload, { isLoading: isUploadLoading }] = useUploadProfilePhotoMutation()
  const [remove, { isLoading: isRemoveLoading }] = useDeleteProfilePhotoMutation()

  const [avatar, setAvatar] = useState<UploadedPhotoType | undefined>(profileAvatar)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')

  useClientProgress(isUploadLoading || isRemoveLoading)

  const handleDialogClose = (open: boolean) => setOpen(open)

  const handleUploadPhoto = async (file: File) => {
    const formData = new FormData()

    formData.append('file', file)

    try {
      const resp = await upload(formData).unwrap()

      const avatar = resp.avatars[0]

      setAvatar({ height: avatar.height, url: avatar.url, width: avatar.width })
      setOpen(false)
    } catch (error) {
      console.error(error)

      setError('Error message')
    }
  }

  const handleDeletePhoto = async () => {
    try {
      await remove().unwrap()

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
          priority
          src={avatar.url}
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
