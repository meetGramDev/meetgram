import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import {
  Photo,
  useDeleteProfilePhotoMutation,
  useUploadProfilePhotoMutation,
} from '@/entities/photo'
import { ConfirmClosingDialog } from '@/shared/components/dialog'
import { serverErrorHandler, useClientProgress } from '@/shared/lib'
import { useTranslate } from '@/shared/lib/useTranslate'
import { isErrorServerMessagesType } from '@/shared/types'
import { Button, Dialog } from '@/shared/ui'
import clsx from 'clsx'

import s from './UploadPhoto.module.scss'

import { UploadedPhotoType } from '../types/types'
import { UploadPhotoForm } from './UploadPhotoForm'

type Props = {
  profileAvatar?: UploadedPhotoType
}

export const UploadPhoto = ({ profileAvatar }: Props) => {
  const [upload, { isLoading: isUploadLoading }] = useUploadProfilePhotoMutation()
  const [remove, { isLoading: isRemoveLoading }] = useDeleteProfilePhotoMutation()

  const [avatar, setAvatar] = useState<UploadedPhotoType | undefined>(profileAvatar)
  const [openUpload, setOpenUpload] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [error, setError] = useState('')
  const t = useTranslate()
  const isMobile = useMediaQuery({ query: '(max-width:650px)' })

  useClientProgress(isUploadLoading || isRemoveLoading)

  const handleUploadPhoto = async (file: File) => {
    const formData = new FormData()

    formData.append('file', file)

    try {
      const resp = await upload(formData).unwrap()

      const avatar = resp.avatars[0]

      setAvatar({ height: avatar.height, url: avatar.url, width: avatar.width })
      setOpenUpload(false)
    } catch (error) {
      const message = serverErrorHandler(error)

      if (typeof message === 'string') {
        setError(message)
      }

      if (isErrorServerMessagesType(message)) {
        setError(`Error in ${message[0].field}: ${message[0].message}`)
      }
    }
  }

  const handleDeletePhoto = async (confirm: boolean) => {
    if (!confirm) {
      setOpenDelete(false)

      return
    }

    try {
      await remove().unwrap()

      setAvatar(undefined)
    } catch (error) {
      console.error(error)
    } finally {
      setOpenDelete(false)
    }
  }

  return (
    <div
      className={clsx(
        'flex h-full w-full flex-col items-center gap-6 text-center',
        isMobile && s.isMobile
      )}
    >
      {!avatar ? (
        <Photo type={'empty'} />
      ) : (
        <>
          <Photo
            alt={t('Avatar')}
            height={avatar?.height}
            onDelete={() => setOpenDelete(true)}
            priority
            src={avatar.url}
            width={avatar?.width}
          />
          <Dialog
            onOpenChange={() => setOpenDelete(false)}
            open={openDelete}
            title={t('Delete photo')}
          >
            <ConfirmClosingDialog
              message={t('Are you sure you want to delete the photo?')}
              onConfirm={handleDeletePhoto}
            />
          </Dialog>
        </>
      )}

      <Dialog
        className={s.dialog}
        onOpenChange={open => setOpenUpload(open)}
        open={openUpload}
        title={t('Add a Profile Photo')}
        trigger={
          <Button className={s.button} fullWidth variant={'outlined'}>
            {avatar?.url ? t('Change profile photo') : t('Add a profile photo')}
          </Button>
        }
      >
        <UploadPhotoForm onErrorMessage={error} onSend={handleUploadPhoto} />
      </Dialog>
    </div>
  )
}
